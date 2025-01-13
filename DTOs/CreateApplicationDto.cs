using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TopCV.DTOs
{
    public class CreateApplicationDto
    {
        public int JobPostID { get; set; } 

        public string? UserJobseeker { get; set; } 

        public string? Cvfile { get; set; }
        public DateOnly? ApplicationDate { get; set; }
    }
}