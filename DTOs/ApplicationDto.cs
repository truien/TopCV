using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TopCV.DTOs
{
    public class ApplicationDto
    {
        public int Id { get; set; }

        public int? IDJobPost { get; set; }

        public string? UserJobseeker { get; set; }

        public DateOnly? ApplicationDate { get; set; }

        public string? Cvfile { get; set; }

        public int? Status { get; set; }
    }
}