using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TopCV.Models;

namespace TopCV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Employer : ControllerBase
    {
        private readonly TopcvContext _context;
        public Employer(TopcvContext context)
        {
            _context = context;
        }
        [HttpGet("get-all-employer")]
        public IActionResult GetAllEmployers()
        {
            var employers = from i in _context.Useremployers
                            join j in _context.Users on i.UserName equals j.UserName
                            select new
                            {
                                i.UserName,
                                j.Email,
                                j.Avatar,
                                i.CompanyName
                            };
            employers.ToList();
            return Ok(employers);
        }
        // [Authorize(Roles = "Admin")]
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
        [HttpGet("get-jobpost/{username}")]
        public IActionResult GetJobPost(string username)
        {
            var jobposts = from i in _context.Jobposts
                join j in _context.Useremployers on i.UserEmployer equals j.UserName
                where j.UserName == username
                select new 
                {
                    i.Id,
                    i.Title,
                    j.CompanyName,
                    i.JobDescription,
                    i.PostDate,
                    i.SalaryRange,
                    i.Status,
                };
             var jobpostsList = jobposts.ToList();

            if (jobpostsList.Count == 0)
            {
                return NotFound("Không tìm thấy bài đăng nào."); 
            }

            return Ok(jobposts);
        }

    }
}