using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Application
{
    public int Id { get; set; }

    public int JobPostId { get; set; }

    public string UserJobseeker { get; set; } = null!;

    public DateTime? ApplicationDate { get; set; }

    public string Cvfile { get; set; } = null!;

    public int Status { get; set; }

    public virtual Jobpost JobPost { get; set; } = null!;

    public virtual Applicationstatus StatusNavigation { get; set; } = null!;

    public virtual Userjobseeker UserJobseekerNavigation { get; set; } = null!;
}
