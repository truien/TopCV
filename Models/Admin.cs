using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Admin
{
    public string UserName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Email { get; set; }

    public string? Avatar { get; set; }
}
