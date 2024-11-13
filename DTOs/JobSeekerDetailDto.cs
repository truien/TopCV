using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TopCV.DTOs
{
    public class JobSeekerDetailDto
    {
        public string? UserName { get; set; }
        public string? FullName { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public string? EducationLevel { get; set; }
        public int? ExperienceYears { get; set; }
        public string? Skills { get; set; }
        public string? Email { get; set; }
        public string? Avatar { get; set; }
        public string? CVFile { get; set; }
    }
}