using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Linq;
using System;
using TopCV.Models;
using Microsoft.EntityFrameworkCore;

namespace TopCV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobPostsController : ControllerBase
    {
        private readonly TopcvContext _context;
        public JobPostsController(TopcvContext context, IConfiguration configuration)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetJobs(string location = "", int page = 1, int pageSize = 12)
        {
            int skip = (page - 1) * pageSize;

            var query = from i in _context.Jobposts
                        join j in _context.Useremployers on i.UserEmployer equals j.UserName
                        join k in _context.Users on j.UserName equals k.UserName
                        where i.Status == 1
                        select new
                        {
                            k.Avatar,
                            Company = j.CompanyName,
                            JobTitle = i.Title,
                            Salary = i.SalaryRange,
                            Location = i.Location
                        };

            if (!string.IsNullOrEmpty(location))
            {
                if (location == "Miền Bắc")
                {
                    query = query.Where(x => x.Location.Contains("Hà Nội") || x.Location.Contains("Hải Dương") || x.Location.Contains("Hải Phòng"));
                }
                else if (location == "Miền Nam")
                {
                    query = query.Where(x => x.Location.Contains("TP.HCM") || x.Location.Contains("Long An") || x.Location.Contains("Nha Trang"));
                }
                else
                {

                    query = query.Where(x => x.Location.Contains(location));
                }
            }

            var jobs = await query
                            .Skip(skip)
                            .Take(pageSize)
                            .ToListAsync();


            var totalJobs = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalJobs / pageSize);

            return Ok(new
            {
                Jobs = jobs,
                TotalPages = totalPages,
                CurrentPage = page
            });
        }

        [HttpGet("get-all-jobpost")]
        public IActionResult GetAllJobPosts()
        {
            var jobpost = from i in _context.Jobposts
                          join j in _context.Useremployers on i.UserEmployer equals j.UserName
                          select new
                          {
                              i.Id,
                              i.Title,
                              j.CompanyName,
                              i.JobDescription,
                              i.PostDate,
                              j.UserName
                          };
            jobpost.ToList();
            return Ok(jobpost);
        }
        [HttpPost("add-jobpost")]
        public IActionResult AddJobPost([FromBody] Jobpost jobPost)
        {
            if (jobPost == null)
            {
                return BadRequest("Thông tin bài đăng không hợp lệ.");
            }

            var newJobPost = new Jobpost
            {
                Company = jobPost.Company,
                Title = jobPost.Title,
                JobDescription = jobPost.JobDescription,
                Requirements = jobPost.Requirements,
                SalaryRange = jobPost.SalaryRange,
                Location = jobPost.Location,
                PostDate = jobPost.PostDate,
                Status = jobPost.Status,
                UserEmployer = jobPost.UserEmployer
            };

            _context.Jobposts.Add(newJobPost);
            _context.SaveChanges();

            var createdJobPost = _context.Entry(newJobPost).Entity;

            return Ok(new { IDJobPost = createdJobPost.Id, Message = "Tạo bài đăng thành công." });
        }

        [HttpDelete("delete-jobpost/{postId}")]
        public IActionResult DeleteJobPost(int postId)
        {
            var jobPost = _context.Jobposts.FirstOrDefault(jp => jp.Id == postId);

            if (jobPost == null)
            {
                return NotFound(new { message = "Bài đăng không tồn tại." });
            }

            _context.Jobposts.Remove(jobPost);
            _context.SaveChanges();

            return Ok(new { message = "Đã xóa bài đăng thành công." });
        }


    }
}