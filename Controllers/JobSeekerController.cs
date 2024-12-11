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
    public class JobSeekerController : ControllerBase
    {
        private readonly TopcvContext _context;
        public JobSeekerController(TopcvContext context)
        {
            _context = context;
        }

        [HttpDelete("delete/{username}")]
        public async Task<IActionResult> DeleteUser(string username)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(p => p.UserName == username);
                if (user == null)
                {
                    return NotFound("Không tìm thấy user");
                }
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                return Ok("Xóa user thành công");
            }
            catch (Exception ex)
            {
                System.Console.WriteLine(ex);
                throw;
            }
        }
        [HttpGet("get-all-jobSeeker")]
        public IActionResult GetAllJobSeekers()
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}/";
            var jobSeekers = from i in _context.Userjobseekers
                            join j in _context.Users on i.UserName equals j.UserName
                            select new
                            {
                                i.UserName,
                                j.Email,
                                Avatar = string.IsNullOrEmpty(j.Avatar) ? "" : baseUrl + "avatar/" + j.Avatar,
                                i.FullName
                            };
            jobSeekers.ToList();


            return Ok(jobSeekers);
        }
        [HttpGet("{username}")]
        public async Task<IActionResult> GetJobSeekerInfo(string username)
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}/";
            var jobSeeker = await (from js in _context.Userjobseekers
                                join u in _context.Users on js.UserName equals u.UserName
                                where js.UserName == username
                                select new JobSeekerDetailDto
                                {
                                    UserName = js.UserName,
                                    FullName = js.FullName,
                                    DateOfBirth = js.DateOfBirth,
                                    EducationLevel = js.EducationLevel,
                                    ExperienceYears = js.ExperienceYears,
                                    Skills = js.Skills,
                                    CVFile = js.CVFile,
                                    Email = u.Email,
                                    Avatar = string.IsNullOrEmpty(u.Avatar) ? "" : baseUrl + "avatar/" + u.Avatar,
                                })
                                .FirstOrDefaultAsync();

            if (jobSeeker == null)
            {
                return NotFound("Người tìm việc không tồn tại.");
            }

            return Ok(jobSeeker);
        }

        // [HttpPost]
        // public async Task<IActionResult> PostJobSeeker(JobSeekerDetailDto seekerDetailDto)
        // {
        //     if(await _context.Userjobseekers.AddAsync(u => u.UserName == seekerDetailDto.UserName))
        // }
    }
}