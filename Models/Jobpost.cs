using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Jobpost
{
    public int Id { get; set; }

    public string Company { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string JobDescription { get; set; } = null!;

    public string Requirements { get; set; } = null!;

    public string SalaryRange { get; set; } = null!;

    public string Location { get; set; } = null!;

    public DateTime PostDate { get; set; }

    public int JobType { get; set; }

    public int Status { get; set; }

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    public virtual Useremployer CompanyNavigation { get; set; } = null!;

    public virtual Jobpoststatus StatusNavigation { get; set; } = null!;

    public virtual ICollection<Jobcategory> Categories { get; set; } = new List<Jobcategory>();
}
