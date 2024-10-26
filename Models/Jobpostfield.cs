using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Jobpostfield
{
    public int JobPostId { get; set; }

    public int JobFieldId { get; set; }

    public virtual Jobpost JobPost { get; set; } = null!;
}
