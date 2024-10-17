using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Userjobseeker
{
    public string UserName { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public DateOnly? DateOfBirth { get; set; }

    public string? EducationLevel { get; set; }

    public string? ExperienceYears { get; set; }

    public string? Skills { get; set; }

    public string? Address { get; set; }

    public string? PassWord { get; set; }

    public string? Avatar { get; set; }

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();
}
