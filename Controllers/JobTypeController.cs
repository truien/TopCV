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
            var jobFields = _context.Jobfields
                                    .Select(j => new{
                                        j.ID,
                                        j.JobField
                                    })
            .ToList();
            
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
            var employmentTypes = _context.Employmenttypes
                                        .Select(j=> new{
                                            j.Id,
                                            j.EmploymentTypeName
                                        })
            .ToList();
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

[HttpPut("updateJobField/{id}")]
public async Task<IActionResult> UpdateJobField(int id, [FromBody] UpdateJobFieldDto updateJobFieldDto)
{
    if (id != updateJobFieldDto.ID)
    {
        return BadRequest("ID không hợp lệ.");
    }
    var jobField = await _context.Jobfields.FindAsync(id);
    if (jobField == null)
    {
        return NotFound("Danh mục ngành nghề không tìm thấy.");
    }
    jobField.JobField = updateJobFieldDto.JobField;
    _context.Entry(jobField).State = EntityState.Modified;
    
    await _context.SaveChangesAsync();

    return NoContent();
}


    // API sửa loại công việc
    [HttpPut("updateEmploymentType/{id}")]
public async Task<IActionResult> UpdateEmploymentType(int id, [FromBody] UpdateEmploymentTypeDto updateEmploymentTypeDto)
{
    if (id != updateEmploymentTypeDto.Id)
    {
        return BadRequest("ID không hợp lệ.");
    }
    var employmentType = await _context.Employmenttypes.FindAsync(id);
    if (employmentType == null)
    {
        return NotFound("Loại công việc không tìm thấy.");
    }
    employmentType.EmploymentTypeName = updateEmploymentTypeDto.EmploymentTypeName;
    _context.Entry(employmentType).State = EntityState.Modified;
    await _context.SaveChangesAsync();
    return NoContent(); 
}

    [HttpDelete("jobfields/{id}")]
        public async Task<IActionResult> DeleteJobField(int id)
        {
            var field = await _context.Jobfields.FindAsync(id);
            if (field == null)
            {
                return NotFound();
            }

            _context.Jobfields.Remove(field);
            await _context.SaveChangesAsync();

            return NoContent(); 
        }
[HttpDelete("employmenttypes/{id}")]
        public async Task<IActionResult> DeleteEmploymentType(int id)
        {
            var employment = await _context.Employmenttypes.FindAsync(id);
            if (employment == null)
            {
                return NotFound(); 
            }

            _context.Employmenttypes.Remove(employment);
            await _context.SaveChangesAsync();

            return NoContent(); 
        }



        // PUT: api/JobType/update-jobpostcategories/{jobPostId}
        // [HttpPut("update-jobpostcategories/{jobPostId}")]
        // public async Task<IActionResult> UpdateJobPostCategories(int jobPostId, List<int> newJobFieldIds, List<int> newEmploymentTypeIds)
        // {
        //     // Kiểm tra nếu dữ liệu gửi lên là hợp lệ
        //     if (newJobFieldIds == null || newEmploymentTypeIds == null)
        //     {
        //         return BadRequest("Dữ liệu danh mục không hợp lệ.");
        //     }

        //     // Lấy các danh mục cũ của bài viết
        //     var currentJobPostFields = _context.Jobpostfields.Where(jpf => jpf.IDJobPost == jobPostId).ToList();
        //     var currentJobPostEmployments = _context.Jobpostemployments.Where(jpe => jpe.IDJobPost == jobPostId).ToList();

        //     // Xóa các danh mục không còn trong danh sách mới
        //     var jobFieldsToRemove = currentJobPostFields.Where(jpf => !newJobFieldIds.Contains(jpf.IDJobField)).ToList();
        //     var employmentTypesToRemove = currentJobPostEmployments.Where(jpe => !newEmploymentTypeIds.Contains(jpe.IDEmploymentType)).ToList();

        //     _context.Jobpostfields.RemoveRange(jobFieldsToRemove);
        //     _context.Jobpostemployments.RemoveRange(employmentTypesToRemove);

        //     // Thêm các danh mục mới vào
        //     foreach (var jobFieldId in newJobFieldIds)
        //     {
        //         // Kiểm tra nếu jobField đã tồn tại, không thêm lại
        //         if (!currentJobPostFields.Any(jpf => jpf.IDJobField == jobFieldId))
        //         {
        //             var jobPostField = new Jobpostfield
        //             {
        //                 IDJobPost = jobPostId,
        //                 IDJobField = jobFieldId
        //             };
        //             _context.Jobpostfields.Add(jobPostField);
        //         }
        //     }

        //     foreach (var employmentTypeId in newEmploymentTypeIds)
        //     {
        //         // Kiểm tra nếu employmentType đã tồn tại, không thêm lại
        //         if (!currentJobPostEmployments.Any(jpe => jpe.IDEmploymentType == employmentTypeId))
        //         {
        //             var jobPostEmployment = new Jobpostemployment
        //             {
        //                 IDJobPost = jobPostId,
        //                 IDEmploymentType = employmentTypeId
        //             };
        //             _context.Jobpostemployments.Add(jobPostEmployment);
        //         }
        //     }

        //     await _context.SaveChangesAsync(); // Lưu thay đổi

        //     return Ok("Cập nhật danh mục bài viết thành công.");
        // }

    }
}
