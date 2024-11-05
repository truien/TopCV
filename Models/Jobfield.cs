using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Jobfield
{
    public int Id { get; set; }

    public string? JobField1 { get; set; } 

    public virtual ICollection<Jobpost> JobPosts { get; set; } = new List<Jobpost>(); 
     public virtual ICollection<Jobpostfield> Jobpostfields { get; set; } = null!;
}
