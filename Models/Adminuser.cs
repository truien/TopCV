using System;
using System.Collections.Generic;

namespace TopCV.Models;

public partial class Adminuser
{
    public string UserName { get; set; } = null!;

    public virtual User UserNameNavigation { get; set; } = null!;
}
