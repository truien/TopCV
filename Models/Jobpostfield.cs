using System;

namespace TopCV.Models;

public partial class Jobpostfield
{
    public int JobPostId { get; set; }
    public int JobFieldId { get; set; }

    public virtual Jobpost JobPost { get; set; } =null!;
    public virtual Jobfield JobField { get; set; }=null!;
}
