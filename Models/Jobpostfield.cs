using System;

namespace TopCV.Models;

public partial class Jobpostfield
{
    public int JobPostID { get; set; }
    public int JobfieldID { get; set; }

    public virtual Jobpost JobPost { get; set; } = null!;
    public virtual Jobfield JobField { get; set; } = null!;
}
