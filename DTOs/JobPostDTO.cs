using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TopCV.DTOs
{
    public class JobPostDTO
    {
        public string? Title { get; set; }
        public string? JobDescription { get; set; }
        public string? Interest { get; set; }
        public string? Requirements { get; set; }
        public string? SalaryRange { get; set; }
        public string? Location { get; set; }
    }
}