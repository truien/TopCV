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
           public async Task<IActionResult> GetJobs(int page = 1, int pageSize = 12)
    {
        var jobs = await (from i in _context.Jobposts 
                        join  j in  _context.Useremployers on i.UserEmployer equals j.UserName
                        join k in _context.Users on j.UserName equals k.UserName
                        where i.Status ==1
                        select new {
                            k.Avatar,
                            Company = j.CompanyName,
                            JobTitle = i.Title,
                            Salary = i.SalaryRange,
                            Location = i.Location
                        }
                        ).ToListAsync();

        var totalJobs = await _context.Jobposts.CountAsync();
        var totalPages = (int)Math.Ceiling((double)totalJobs / pageSize);

        return Ok(new
        {
            Jobs = jobs,
            TotalPages = totalPages
        });
    }
    }
}