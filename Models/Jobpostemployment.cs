
using System.ComponentModel.DataAnnotations.Schema;


namespace TopCV.Models
{
    public class Jobpostemployment
    {
        public int IDJobPost { get; set; }
        public int IDEmploymentType { get; set; }

        public Employmenttype EmploymentType { get; set; } = null!;
        public Jobpost JobPost { get; set; } = null!;
    }
}