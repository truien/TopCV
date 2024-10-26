﻿using System;
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

    public int? Status { get; set; }

    public string UserEmployer { get; set; } = null!;

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    public virtual Jobpoststatus? StatusNavigation { get; set; }

    public virtual Useremployer UserEmployerNavigation { get; set; } = null!;

    public virtual ICollection<Employmenttype> IdemploymentTypes { get; set; } = new List<Employmenttype>();

    public virtual ICollection<Jobfield> JobFields { get; set; } = new List<Jobfield>();
}
