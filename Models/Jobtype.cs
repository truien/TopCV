using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Jobtype
{
    public int Id { get; set; }

    public string? JobTypeName { get; set; }

    public virtual ICollection<Jobpost> Jobposts { get; set; } = new List<Jobpost>();
}
