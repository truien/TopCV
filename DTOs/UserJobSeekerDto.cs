using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TopCV.DTOs
{
    public class UserJobSeekerDto
    {
        public string UserName { get; set; } = null!;

        public string? FullName { get; set; }

        public DateOnly? DateOfBirth { get; set; } 

        public string? EducationLevel { get; set; }

        public int? ExperienceYears { get; set; }

        public string? Skills { get; set; }

        public string? Address { get; set; }

        public string? CVFilePath { get; set; }
    }
}