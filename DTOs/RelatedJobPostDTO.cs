using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TopCV.DTOs
{
    public class RelatedJobPostDTO
    {
    public int Id { get; set; }

    public string? Title { get; set; }
    public string? CompanyName { get; set; }

    public string? JobDescription { get; set; }

    public string? Requirements { get; set; }
    public string? Interest { get; set; }

    public string? SalaryRange { get; set; }

    public string? Location { get; set; }

    public DateOnly? PostDate { get; set; }
    public DateOnly? ApplyDeadline { get; set;}
    public string? Avatar { get; set; }
    public string? JobField { get; set; }
    public string? EmploymentType { get; set; }
    }
}