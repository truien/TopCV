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
using TopCV.DTOs;

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
            var baseUrl = $"{Request.Scheme}://{Request.Host}/";
            var query = from i in _context.Jobposts
                        join j in _context.Useremployers on i.UserEmployer equals j.UserName
                        join k in _context.Users on j.UserName equals k.UserName
                        where i.Status == 1
                        select new
                        {
                            Id = i.Id,
                            Avatar = string.IsNullOrEmpty(k.Avatar) ? "" : baseUrl + "avatar/" + k.Avatar,
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
        public IActionResult GetAllJobPosts([FromQuery] int? status)
        {
            var jobposts = from i in _context.Jobposts
                            join j in _context.Useremployers on i.UserEmployer equals j.UserName
                            select new
                            {
                                i.Id,
                                i.Title,
                                j.CompanyName,
                                i.JobDescription,
                                i.PostDate,
                                j.UserName,
                                i.Status
                            };
            if (status.HasValue)
            {
                jobposts = jobposts.Where(jp => jp.Status == status.Value);
            }
            else
            {
                jobposts = jobposts.Where(jp => jp.Status == 1 || jp.Status == 2);
            }

            var jobpostsList = jobposts.ToList();
            return Ok(jobpostsList);
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
                Title = jobPost.Title,
                JobDescription = jobPost.JobDescription,
                Requirements = jobPost.Requirements,
                Interest = jobPost.Interest,
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

        [HttpPut("update-jobpost-status/{postId}")]
        public IActionResult UpdateJobPostStatus(int postId, [FromBody] int newStatus)
        {
            var jobPost = _context.Jobposts.FirstOrDefault(jp => jp.Id == postId);
            if (jobPost == null)
            {
                return NotFound(new { message = "Bài đăng không tồn tại." });
            }
            jobPost.Status = newStatus;
            _context.SaveChanges();
            return Ok(new { message = "Cập nhật trạng thái bài đăng thành công.", UpdatedStatus = newStatus });
        }
        [HttpGet("get-jobpost/{postId}")]
        public IActionResult GetJobPost(int postId)
        {
            var jobPost = _context.Jobposts.FirstOrDefault(jp => jp.Id == postId);
            if (jobPost == null)
            {
                return NotFound(new { message = "Bài đăng không tồn tại." });
            }
            return Ok(jobPost);
        }
        [HttpPut("update-jobpost/{id}")]
        public async Task<IActionResult> UpdateJobPost(int id, [FromBody] JobPostDTO updatedJobPost)
        {

            var existingJobPost = await _context.Jobposts.FindAsync(id);
            if (existingJobPost == null)
            {
                return NotFound("Không tìm thấy bài đăng công việc.");
            }

            existingJobPost.Title = updatedJobPost.Title;
            existingJobPost.JobDescription = updatedJobPost.JobDescription;
            existingJobPost.Requirements = updatedJobPost.Requirements;
            existingJobPost.Interest = updatedJobPost.Interest;
            existingJobPost.SalaryRange = updatedJobPost.SalaryRange;
            existingJobPost.Location = updatedJobPost.Location;

            try
            {
                await _context.SaveChangesAsync();
                return Ok("Cập nhật thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi cập nhật bài đăng: {ex.Message}");
            }
        }


    }
}