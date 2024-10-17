using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Useremployer
{
    public string? CompanyName { get; set; }

    public string? CompanyInfo { get; set; }

    public string? CompanyAddress { get; set; }

    public string UserName { get; set; } = null!;

    public string PassWord { get; set; } = null!;

    public string? Avatar { get; set; }

    public virtual ICollection<Jobpost> Jobposts { get; set; } = new List<Jobpost>();
}
