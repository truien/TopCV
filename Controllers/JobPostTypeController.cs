using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TopCV.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TopCV.Models;

namespace TopCV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobPostTypeController : ControllerBase
    {
        private readonly TopcvContext _context;

        public JobPostTypeController(TopcvContext context)
        {
            _context = context;
        }

        // POST: api/JobPostType/add-jobpostfield
        [HttpPost("add-jobpostfield")]
        public async Task<ActionResult<Jobpostfield>> PostJobPostField(CreateJobPostFieldDto dto)
        {
            if (dto == null || dto.IDJobPost <= 0 || dto.IDJobField <= 0)
            {
                return BadRequest("Invalid input data.");
            }

            var jobPostField = new Jobpostfield
            {
                IDJobPost = dto.IDJobPost,
                IDJobField = dto.IDJobField
            };

            _context.Jobpostfields.Add(jobPostField);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(PostJobPostField), new { id = jobPostField.IDJobPost }, jobPostField);
        }

        [HttpPost("add-jobpostemployment")]
        public async Task<ActionResult<Jobpostemployment>> PostJobPostEmployment(CreateJobPostEmploymentDto dto)
        {
            if (dto == null || dto.IDJobPost <= 0 || dto.IDEmploymentType <= 0)
            {
                return BadRequest("Invalid input data.");
            }

            var jobPostEmployment = new Jobpostemployment
            {
                IDJobPost = dto.IDJobPost,
                IDEmploymentType = dto.IDEmploymentType
            };

            _context.Jobpostemployments.Add(jobPostEmployment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(PostJobPostEmployment), new { id = jobPostEmployment.IDJobPost }, jobPostEmployment);
        }
    }
}
