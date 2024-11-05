using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Employmenttype
{
    public int Id { get; set; }

    public string? EmploymentTypeName { get; set; }

    public virtual ICollection<Jobpostemployment> Jobpostemployments { get; set; } = new List<Jobpostemployment>();
    
    public virtual ICollection<Jobpost> IdjobPosts { get; set; } = new List<Jobpost>();
}
