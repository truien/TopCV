using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TopCV.Model
{
    public class Employer
    {
        [Key]
        public int ID {set;get;}
        public string? CompanyName {set;get;}
        public string? CompanyInfo{set;get;}
        public string? CompanyAddress{set;get;}
        [ForeignKey("User")] 
        public string? UserName { get; set; } 
    }
}