using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TopCV.DTOs;
using TopCV.Models;

namespace TopCV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationsController : ControllerBase
    {
        private readonly TopcvContext _context;

        public ApplicationsController(TopcvContext context)
        {
            _context = context;
        }
        [HttpGet]
    public async Task<IActionResult> GetApplications()
    {
        var applications = await _context.Applications
            .Include(a => a.JobPost)
            .Include(a => a.StatusNavigation)
            .Include(a => a.UserJobseekerNavigation)
            .ToListAsync();
        var applicationDtos = applications.Select(a => new ApplicationDto
        {
            Id = a.Id,
            IDJobPost = a.IDJobPost,
            UserJobseeker = a.UserJobseeker,
            ApplicationDate = a.ApplicationDate,
            Cvfile = a.Cvfile,
            Status = a.Status,
        }).ToList();

        return Ok(applicationDtos);
    }
    [HttpPost]
    public async Task<IActionResult> CreateApplication([FromBody] CreateApplicationDto dto)
    {

        if (dto == null)
        {
            return BadRequest("Invalid application data.");
        }
        var existingApplication = _context.Applications.FirstOrDefault(a =>
            a.IDJobPost == dto.JobPostID &&
            a.UserJobseeker == dto.UserJobseeker);

        if (existingApplication != null)
        {
            return Conflict(new { message = "Bạn đã ứng tuyển vào bài tuyển dụng này rồi!" });
        }
        var jobPost = await _context.Jobposts.FindAsync(dto.JobPostID);
        if (jobPost == null)
        {
            return NotFound($"Job post with ID {dto.JobPostID} not found.");
        }


        var application = new Application
        {
            IDJobPost = dto.JobPostID,
            UserJobseeker = dto.UserJobseeker,
            Cvfile = dto.Cvfile,
            ApplicationDate = DateOnly.FromDateTime(DateTime.UtcNow),
            Status = 1 
        };

        _context.Applications.Add(application);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    [HttpGet("{UserName}")]
    public async Task<IActionResult> GetApplications(string UserName)
    {
        var applicationDtos = await(from a in _context.Applications
        join b in _context.Jobposts on a.IDJobPost equals b.Id
            where b.UserEmployer == UserName
            select new{
                a.Id,
                a.IDJobPost,
                a.ApplicationDate,
                CVLink = a.Cvfile != null ? $"{Request.Scheme}://{Request.Host}/cv/{Path.GetFileName(a.Cvfile)}" : null,
                a.UserJobseeker,
            }).ToListAsync() ;
        return Ok(applicationDtos);
    }

    
    }
}