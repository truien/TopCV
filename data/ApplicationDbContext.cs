using Microsoft.EntityFrameworkCore;
using TopCV.Model;

namespace TopCV.data
{
   public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
        : base(options)
    {
    }

    // Định nghĩa các DbSet cho các bảng
   public DbSet<User> Users { get; set; }
   public DbSet<Employer>Employer{set;get;}
}
}