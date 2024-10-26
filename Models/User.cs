using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class User
{
    public string UserName { get; set; } = null!;

    public string? Password { get; set; }

    public string? Email { get; set; }

    public string? Avatar { get; set; }

    public virtual Adminuser? Adminuser { get; set; }

    public virtual Useremployer? Useremployer { get; set; }

    public virtual Userjobseeker? Userjobseeker { get; set; }
}
