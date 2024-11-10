using System;
using System.ComponentModel.DataAnnotations;

namespace TopCV.Models;

public partial class Jobpostfield
{
    public int IDJobPost { get; set; }
    public int JobFieldID { get; set; }

    public virtual Jobpost? JobPost { get; set; }
    public virtual Jobfield? JobField { get; set; } 
}
