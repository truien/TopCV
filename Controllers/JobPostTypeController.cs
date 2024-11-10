using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        [HttpPost("add-jobpostfield")]
        public async Task<IActionResult> AddJobPostField([FromBody] Jobpostfield jobPostField)
        {
            if (jobPostField == null)
            {
                return BadRequest("Dữ liệu Job Post Field bị thiếu.");
            }

            try
            {
                _context.Jobpostfields.Add(jobPostField);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(AddJobPostField), new { id = jobPostField.JobPostID }, jobPostField);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi: " + ex.Message);
            }
        }


        [HttpPost("add-jobpostemployment")]
        public async Task<ActionResult<Jobpostemployment>> CreateJobpostemployment(Jobpostemployment jobpostemployment)
        {

            var jobPost = await _context.Jobposts.FindAsync(jobpostemployment.JobPostID);
            var employmentType = await _context.Employmenttypes.FindAsync(jobpostemployment.EmploymentID);

            if (jobPost == null || employmentType == null)
            {
                return NotFound("JobPost hoặc EmploymentType không tồn tại.");
            }

            _context.Jobpostemployments.Add(jobpostemployment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateJobpostemployment), new { id = jobpostemployment.JobPostID }, jobpostemployment);
        }
    }
}