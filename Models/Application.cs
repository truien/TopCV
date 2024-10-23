using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Application
{
    public int Id { get; set; }

    public int? JobPostId { get; set; }

    public string? UserJobseeker { get; set; }

    public DateOnly? ApplicationDate { get; set; }

    public string? Cvfile { get; set; }

    public int? Status { get; set; }

    public virtual Jobpost? JobPost { get; set; }

    public virtual Applicationstatus? StatusNavigation { get; set; }

    public virtual Userjobseeker? UserJobseekerNavigation { get; set; }
}
