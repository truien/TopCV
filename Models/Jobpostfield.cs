using System;
using System.ComponentModel.DataAnnotations;

namespace TopCV.Models;

public class Jobpostfield
{
    public int IDJobPost { get; set; }
    public int IDJobField { get; set; }

    public Jobpost? JobPost { get; set; }
    public Jobfield? JobField { get; set; }
}

