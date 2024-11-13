using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Userjobseeker
{
    public string UserName { get; set; } = null!;

    public string? FullName { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public string? EducationLevel { get; set; }

    public int? ExperienceYears { get; set; }

    public string? Skills { get; set; }

    public string? Address { get; set; }
    public string? CVFile { get; set; }


    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    public virtual User UserNameNavigation { get; set; } = null!;
}
