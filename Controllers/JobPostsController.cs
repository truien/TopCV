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
                                i.Status,
                                i.ApplyDeadline,
                                i.JobOpeningCount
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

        [HttpGet("{id}")]
        public IActionResult GetJobPostDetails(int id){
            var baseUrl = $"{Request.Scheme}://{Request.Host}/";
            var jobpost = _context.Jobposts
            .Include(jp => jp.Jobpostfields).ThenInclude(jpf => jpf.JobField)
            .Include(jp=> jp.JobpostEmployments).ThenInclude(jpe => jpe.EmploymentType)
            .Include(jp => jp.UserEmployerNavigation!).ThenInclude(jpu => jpu.UserNameNavigation)
            .Where(jp => jp.Id == id)
            .Select (jp => new
            {
                jp.Id,
                jp.Title,
                jp.JobDescription,
                jp.Requirements,
                jp.SalaryRange,
                jp.Location,
                jp.PostDate,
                jp.Interest,
                jp.ApplyDeadline,
                jp.JobOpeningCount,
                jp.UserEmployer,
                Employer = new
                {
                    jp.UserEmployerNavigation!.CompanyName,
                    Avatar = string.IsNullOrEmpty( jp.UserEmployerNavigation.UserNameNavigation.Avatar) ? "" : baseUrl + "avatar/" +  jp.UserEmployerNavigation.UserNameNavigation.Avatar,
                },
                Fields = jp.Jobpostfields.Select(jpf => jpf.JobField!.JobField),
                Employment = jp.JobpostEmployments.Select(jpe => jpe.EmploymentType.EmploymentTypeName)
            }).FirstOrDefault();
            if (jobpost == null)
            {
                return NotFound(new { message = "Bài đăng không tồn tại" });
            }

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
                Title = jobPost.Title,
                JobDescription = jobPost.JobDescription,
                Requirements = jobPost.Requirements,
                Interest = jobPost.Interest,
                SalaryRange = jobPost.SalaryRange,
                Location = jobPost.Location,
                PostDate = jobPost.PostDate,
                ApplyDeadline = jobPost.ApplyDeadline,
                JobOpeningCount = jobPost.JobOpeningCount,
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
        public async Task<IActionResult> GetJobPost(int postId)
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}/";
            var jobPost = await (from i in _context.Jobposts
                        join j in _context.Useremployers on i.UserEmployer equals j.UserName
                        join k in _context.Users on j.UserName equals k.UserName
                        where i.Id == postId
                        select new{
                            i,
                            j.CompanyName,
                            Avatar = string.IsNullOrEmpty(k.Avatar) ? "" : baseUrl + "avatar/" + k.Avatar,
                        }).FirstOrDefaultAsync();
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
            existingJobPost.JobOpeningCount = updatedJobPost.JobOpeningCount;
            existingJobPost.ApplyDeadline = updatedJobPost.ApplyDeadline;

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
        [HttpGet("related")]
            public async Task<IActionResult> GetRelatedJobPosts(
                string? Fields = null,
                string? location = null,
                string? employment = null,
                string? companyname = null,
                int? excludeId = null,
                int limitted = 10)
            {
                var baseUrl = $"{Request.Scheme}://{Request.Host}/";
                var query = from i in _context.Jobposts
                            join j in _context.Useremployers on i.UserEmployer equals j.UserName
                            join k in _context.Users on i.UserEmployer equals k.UserName
                            from f in _context.Jobpostfields.Where(f => f.IDJobPost == i.Id).DefaultIfEmpty()
                            from g in _context.Jobfields.Where(g => f != null && f.IDJobField == g.ID).DefaultIfEmpty()
                            from h in _context.Jobpostemployments.Where(h => h.IDJobPost == i.Id).DefaultIfEmpty()
                            from m in _context.Employmenttypes.Where(m => h != null && h.IDEmploymentType == m.Id).DefaultIfEmpty()
                            where i.Status == 1
                            orderby i.PostDate descending
                            select new RelatedJobPostDTO
                            {
                                Id = i.Id,
                                Title = i.Title,
                                CompanyName = j.CompanyName,
                                JobDescription = i.JobDescription,
                                Requirements = i.Requirements,
                                Interest = i.Interest,
                                PostDate = i.PostDate,
                                Location = i.Location,
                                SalaryRange = i.SalaryRange,
                                ApplyDeadline = i.ApplyDeadline,
                                Avatar = string.IsNullOrEmpty(k.Avatar) ? "" : baseUrl + "avatar/" + k.Avatar,
                                JobField = g != null ? g.JobField : null,
                                EmploymentType = m != null ? m.EmploymentTypeName : null,
                            };

                        query = query.Where(j =>
                        (!string.IsNullOrEmpty(Fields) && !string.IsNullOrEmpty(j.JobField) && j.JobField.Contains(Fields!)) ||
                        (!string.IsNullOrEmpty(location) && !string.IsNullOrEmpty(j.Location) && j.Location.Contains(location!)) ||
                        (!string.IsNullOrEmpty(employment) && !string.IsNullOrEmpty(j.EmploymentType) && j.EmploymentType.Contains(employment!))
                    );


                if (excludeId.HasValue)
                {
                    query = query.Where(j => j.Id != excludeId);
                }
                if (!string.IsNullOrEmpty(companyname))
                {
                    query = query.Where(j => j.CompanyName!=companyname);
                }

                var relatedJobPosts = await query
                        .Take(limitted)
                        .ToListAsync();
                return Ok(relatedJobPosts);
            }

    
        [HttpGet("JobPostByName/{name}")]
        public async Task<IActionResult> GetRelatedJobPostsByName(string name){
            if(string.IsNullOrEmpty(name))
            {
                return BadRequest("Tên không hợp lệ");
            }
            var baseUrl = $"{Request.Scheme}://{Request.Host}/";
            var query = await (from i in _context.Jobposts
                                join j in _context.Useremployers on i.UserEmployer equals j.UserName
                                join k in _context.Users on j.UserName equals k.UserName
                                where j.CompanyName == name
                                select new{
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
                        }).ToListAsync();
                        if (query == null || !query.Any())
                        {
                            return NotFound("Không có bài đăng nào");
                        }
                        return Ok(query);
        }
        [HttpGet("InfoByName/{name}")]
        public async Task<IActionResult> GetInfoByName(string name){
            if(string.IsNullOrEmpty(name))
            {
                return BadRequest("Tên không hợp lệ");
            }
            var baseUrl = $"{Request.Scheme}://{Request.Host}/";
            var query = await ( from i in _context.Useremployers
                                join j in _context.Users on i.UserName equals j.UserName
                                where i.CompanyName == name
                                select new{
                                    i.CompanyName,
                                    i.CompanyInfo,
                                    i.Address,
                                    Avatar = string.IsNullOrEmpty(j.Avatar) ? "" : baseUrl + "avatar/" + j.Avatar,
                                }).FirstOrDefaultAsync();
                        if (query == null )
                        {
                            return NotFound("Không có bài đăng nào");
                        }
                        return Ok(query);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> FilterJobPosts(
            string? title = null,
            string? companyName = null,
            int? jobFieldId = null,
            int? employmentTypeId = null,
            string? location = null,
            string? salaryrange = null,
            int page = 1,
            int pageSize = 10)
        {
            if (page <= 0 || pageSize <= 0)
            {
                return BadRequest(new { Message = "Page and pageSize must be greater than 0." });
            }

            var baseUrl = $"{Request.Scheme}://{Request.Host}/";
            var query = from jobPost in _context.Jobposts
                        join employer in _context.Useremployers on jobPost.UserEmployer equals employer.UserName
                        join user in _context.Users on employer.UserName equals user.UserName
                        join employment in _context.Jobpostemployments on jobPost.Id equals employment.IDJobPost
                        join jobField in _context.Jobpostfields on jobPost.Id equals jobField.IDJobPost
                        where jobPost.Status == 1
                        select new
                        {
                            jobPost.Id,
                            jobPost.Title,
                            employer.CompanyName,
                            jobPost.Location,
                            SalaryRange = string.IsNullOrEmpty(jobPost.SalaryRange) ? "0-0" : jobPost.SalaryRange,
                            jobPost.JobDescription,
                            jobPost.PostDate,
                            jobPost.Requirements,
                            jobPost.ApplyDeadline,
                            Avatar = string.IsNullOrEmpty(user.Avatar) ? "" : baseUrl + "avatar/" + user.Avatar,
                            employment.IDEmploymentType,
                            jobField.IDJobField
                        };
            
            if (!string.IsNullOrEmpty(title))
                query = query.Where(j => j.Title.Contains(title));
            if (!string.IsNullOrEmpty(companyName))
                query = query.Where(j => j.CompanyName.Contains(companyName));
            if (!string.IsNullOrEmpty(location))
                query = query.Where(j => j.Location.Contains(location));
            if (jobFieldId.HasValue)
                query = query.Where(j => j.IDJobField == jobFieldId);
            if (employmentTypeId.HasValue)
                query = query.Where(j => j.IDEmploymentType == employmentTypeId);

            var jobPosts = await query.ToListAsync();

            if (!string.IsNullOrEmpty(salaryrange))
            {
                var salaries = salaryrange.Replace("triệu", "").Trim().Split('-');
                if (salaries.Length == 2 &&
                    int.TryParse(salaries[0].Trim(), out int minSalary) &&
                    int.TryParse(salaries[1].Trim(), out int maxSalary))
                {
                    jobPosts = jobPosts.Where(j => IsSalaryInRange(j.SalaryRange, minSalary, maxSalary)).ToList();
                }
            }

            var totalCount = jobPosts.Count();
            var results = jobPosts.GroupBy(j => j.Id).Select(g => g.First()).Skip((page - 1) * pageSize).Take(pageSize).ToList();

            return Ok(new
            {
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize,
                Data = results
            });
        }

private bool IsSalaryInRange(string salaryRange, int minSalary, int maxSalary)
{
    if (string.IsNullOrEmpty(salaryRange) || !salaryRange.Contains('-'))
        return false;

    var range = salaryRange.Replace("triệu", "").Trim().Split('-');
    if (range.Length != 2)
        return false;

    if (!int.TryParse(range[0].Trim(), out int jobMinSalary) || !int.TryParse(range[1].Trim(), out int jobMaxSalary))
        return false;

    return jobMinSalary >= minSalary && jobMaxSalary <= maxSalary;
}

    }
}