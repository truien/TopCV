using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Applicationstatus
{
    public int Id { get; set; }

    public string? StatusName { get; set; }

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();
}
