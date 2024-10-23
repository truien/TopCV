using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Useremployer
{
    public string UserName { get; set; } = null!;

    public string? CompanyName { get; set; }

    public string? CompanyInfo { get; set; }

    public string? Address { get; set; }

    public virtual User UserNameNavigation { get; set; } = null!;
}
