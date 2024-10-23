using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Jobpostcategory
{
    public int? JobPostId { get; set; }

    public int? CategoryId { get; set; }

    public virtual Category? Category { get; set; }

    public virtual Jobpost? JobPost { get; set; }
}
