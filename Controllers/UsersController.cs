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
public async Task<IActionResult> UpdateUser(string userName, [FromForm] UserUpdateDto updatedUser)
{
    var user = await _context.Users.FindAsync(userName);
    if (user == null)
    {
        return NotFound("Người dùng không tồn tại.");
    }

    // Kiểm tra mật khẩu cũ nếu có
    if (!string.IsNullOrEmpty(updatedUser.CurrentPassword))
    {
        if (updatedUser.CurrentPassword != user.Password)
        {
            return BadRequest("Mật khẩu hiện tại không đúng.");
        }
    }

    // Cập nhật mật khẩu mới nếu có
    if (!string.IsNullOrEmpty(updatedUser.NewPassword))
    {
        user.Password = updatedUser.NewPassword; 
    }

    user.Email = updatedUser.Email ?? user.Email;

    if (updatedUser.Avatar != null)
    {
        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(updatedUser.Avatar.FileName);
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "avatar", fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await updatedUser.Avatar.CopyToAsync(stream);
        }

        user.Avatar = fileName;
    }

    // Lưu thay đổi vào cơ sở dữ liệu
    await _context.SaveChangesAsync();

    return Ok(user);
}

    

    }
}