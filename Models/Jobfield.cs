using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Jobfield
{
    public int ID { get; set; }

    public string? JobField { get; set; } 

     public virtual ICollection<Jobpostfield> Jobpostfields { get; set; } = null!;
}
