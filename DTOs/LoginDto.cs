using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TopCV.DTOs
{
    public class LoginDto
    {
        public string UserName { get; set; } = null!;

        public string? Password { get; set; }
    }
}