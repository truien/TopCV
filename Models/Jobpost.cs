using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Jobpost
{
    public int Id { get; set; }

    public string? Company { get; set; }

    public string? Title { get; set; }

    public string? JobDescription { get; set; }

    public string? Requirements { get; set; }

    public string? SalaryRange { get; set; }

    public string? Location { get; set; }

    public DateOnly? PostDate { get; set; }

    public int? JobType { get; set; }

    public int? Status { get; set; }

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    public virtual Jobtype? JobTypeNavigation { get; set; }

    public virtual Jobpoststatus? StatusNavigation { get; set; }
}
