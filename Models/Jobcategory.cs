using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Jobcategory
{
    public int Id { get; set; }

    public string? JobCategory1 { get; set; }

    public virtual ICollection<Jobpost> JobPosts { get; set; } = new List<Jobpost>();
}
