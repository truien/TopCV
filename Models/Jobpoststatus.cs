using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Jobpoststatus
{
    public int Id { get; set; }

    public string StatusName { get; set; } = null!;

    public virtual ICollection<Jobpost> Jobposts { get; set; } = new List<Jobpost>();
}
