using System.ComponentModel.DataAnnotations;

namespace TopCV.Model
{
    public class User
    {
    [Key]
    public string? UserName { get; set; }
    public string? Password { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; } 
    }
}