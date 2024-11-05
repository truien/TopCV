using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TopCV.Models;

namespace TopCV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobTypeController : ControllerBase
    {
        private readonly TopcvContext _context;
        public JobTypeController(TopcvContext context)
        {
            _context = context;
        }

        // GET: api/JobType/jobfields
        [HttpGet("jobfields")]
        public IActionResult GetJobFields()
        {
            var jobFields = _context.Jobfields.ToList();
            return Ok(jobFields);
        }

        // POST: api/JobType/jobfields
        [HttpPost("jobfields")]
        public async Task<IActionResult> CreateJobField(Jobfield jobField)
        {
            try
            {
                _context.Jobfields.Add(jobField);
                await _context.SaveChangesAsync();
                return Ok("Thêm Job Field thành công");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/JobType/employmenttypes
        [HttpGet("employmenttypes")]
        public IActionResult GetEmploymentTypes()
        {
            var employmentTypes = _context.Employmenttypes.ToList();
            return Ok(employmentTypes);
        }

        // POST: api/JobType/employmenttypes
        [HttpPost("employmenttypes")]
        public async Task<IActionResult> CreateEmploymentType(Employmenttype employmentType)
        {
            try
            {
                _context.Employmenttypes.Add(employmentType);
                await _context.SaveChangesAsync();
                return Ok("Thêm Employment Type thành công");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
