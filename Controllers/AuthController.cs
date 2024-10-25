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

namespace TopCV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly TopcvContext _context;
        private readonly IConfiguration _configuration;
         
        public AuthController(TopcvContext context, IConfiguration configuration){
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login ([FromBody] User user)
        {
            var existingUser = _context.Users
            .FirstOrDefault(u=>u.UserName == user.UserName && u.Password == user.Password);

            if (existingUser != null)
            {
                var token = GenerateToken(existingUser.UserName);
                string userType = GetUserType(existingUser.UserName);

                return Ok(new {token, userType});
            }

            return Unauthorized("Thông tin đăng nhập không chính xác.");
        }

        private string GenerateToken(string userName)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey,SecurityAlgorithms.HmacSha256);
            
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userName),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, GetUserType(userName))
            };
         var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);     
            }

        private string GetUserType(string userName)
        {
            if (_context.Adminusers.Any(a => a.UserName == userName))
            {
                return "Admin";
            }
            else if (_context.Useremployers.Any(e => e.UserName == userName))
            {
                return "Employer";
            }
            else if (_context.Userjobseekers.Any(j => j.UserName == userName))
            {
                return "JobSeeker";
            }
            return "Unknown";
        }

        [Authorize(Roles ="Admin")]
        [HttpGet("admin-data")]
        public IActionResult GetAdminData()
        {
            return Ok (new {Data = "Dữ liệu chỉ dành cho admin " });
        }
        [Authorize(Roles ="Employer")]
        [HttpGet("employer-data")]
        public IActionResult GetEmployerData()
        {
            return Ok (new {Data = "Dữ liệu chỉ dành cho Employer " });
        }
        [Authorize(Roles ="JobSeeker")]
        [HttpGet("jobSeeker-data")]
        public IActionResult GetJobSeekerData()
        {
            return Ok (new {Data = "Dữ liệu chỉ dành cho JobSeeker " });
        }
    }
    }