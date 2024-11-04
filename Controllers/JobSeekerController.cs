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
            var jobSeekers = from i in _context.Userjobseekers
                             join j in _context.Users on i.UserName equals j.UserName
                             select new
                             {
                                 i.UserName,
                                 j.Email,
                                 j.Avatar,
                                 i.FullName
                             };
            jobSeekers.ToList();


            return Ok(jobSeekers);
        }

    }
}