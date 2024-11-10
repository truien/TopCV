using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TopCV.Models
{
    public class Jobpostemployment
    {
        public int JobPostID { get; set; }
        public int EmploymentID { get; set; }

        public Employmenttype EmploymentType { get; set; } = null!;
        public Jobpost JobPost { get; set; } = null!;
    }
}