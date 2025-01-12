using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TopCV.Models;
using TopCV.DTOs;

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
            var baseUrl = $"{Request.Scheme}://{Request.Host}/";
            var employers = from i in _context.Useremployers
                            join j in _context.Users on i.UserName equals j.UserName
                            select new
                            {
                                i.UserName,
                                j.Email,
                                Avatar = string.IsNullOrEmpty(j.Avatar) ? "" : baseUrl + "avatar/" + j.Avatar,
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
            var baseUrl = $"{Request.Scheme}://{Request.Host}/";
            var jobposts = from i in _context.Jobposts
                join j in _context.Useremployers on i.UserEmployer equals j.UserName
                join k in _context.Users on i.UserEmployer equals k.UserName
                where j.UserName == username && i.Status ==1 || i.Status ==2
                select new 
                {
                    i.Id,
                    i.Title,
                    j.CompanyName,
                    i.JobDescription,
                    i.PostDate,
                    i.SalaryRange,
                    i.Status,
                    i.ApplyDeadline,
                    i.JobOpeningCount,
                    Avatar = string.IsNullOrEmpty(k.Avatar) ? "" : baseUrl + "avatar/" + k.Avatar,
                };
            var jobpostsList = jobposts.ToList();

            if (jobpostsList.Count == 0)
            {
                return NotFound("Không tìm thấy bài đăng nào."); 
            }

            return Ok(jobposts);
        }
    [HttpPut("{userName}")]
    public async Task<IActionResult> UpdateEmployer(string userName, [FromBody] UserEmployerUpdateDto updateDto)
    {
        if (string.IsNullOrEmpty(userName))
        {
            return BadRequest("Tên đăng nhập không hợp lệ.");
        }
        var employer = await _context.Useremployers
            .Include(e => e.UserNameNavigation) 
            .FirstOrDefaultAsync(e => e.UserName == userName);
        if (employer == null)
        {
            return NotFound("Nhà tuyển dụng không tồn tại.");
        }
        employer.CompanyName = updateDto.CompanyName;
        employer.CompanyInfo = updateDto.CompanyInfo;
        employer.Address = updateDto.Address;
        try
        {
            await _context.SaveChangesAsync();
            return Ok("Cập nhật thông tin thành công.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Đã xảy ra lỗi khi cập nhật: {ex.Message}");
        }
    }
    [HttpGet("infor/{userName}")]
    public async Task<IActionResult> GetInforEmployer(string userName)
    {
        if(string.IsNullOrEmpty(userName)){
            return BadRequest("Tên đăng nhập không hợp lệ.");
        }
        var employer = await _context.Useremployers
                        .Where(j=>j.UserName == userName)
                        .Select(j => new {
                            j.UserName,
                            j.CompanyName,
                            j.CompanyInfo,
                            j.Address,
                        })
                        .ToListAsync();
            
        if (employer == null)
        {
            return NotFound("Nhà tuyển dụng không tồn tại.");
        }
        return Ok(employer);
    }
    }
}