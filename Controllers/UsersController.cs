using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TopCV.Models;
using TopCV.DTOs;
using Microsoft.EntityFrameworkCore;

namespace TopCV.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly TopcvContext _context;
        public UsersController(TopcvContext context){
            _context = context;
        }
        [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }
    [HttpGet("{userName}")]
    public async Task<IActionResult> GetUser(string userName)
    {
        var user = await _context.Users.FindAsync(userName);
        if (user == null) return NotFound("Người dùng không tồn tại.");
        return Ok(user);
    }
    [HttpPost]
    public async Task<IActionResult> AddUser([FromBody] User user)
    {
        if (await _context.Users.AnyAsync(u => u.UserName == user.UserName))
            return BadRequest("Tên đăng nhập đã tồn tại.");
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(user);
    }
    [HttpPut("{userName}")]
    public async Task<IActionResult> UpdateUser(string userName, [FromBody] User updatedUser)
    {
        var user = await _context.Users.FindAsync(userName);
        if (user == null) return NotFound("Người dùng không tồn tại.");

        user.Email = updatedUser.Email ?? user.Email;
        user.Avatar = updatedUser.Avatar ?? user.Avatar;

        await _context.SaveChangesAsync();
        return Ok(user);
    }
    

    }
}