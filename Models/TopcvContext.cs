using Microsoft.EntityFrameworkCore;

namespace TopCV.Models;

public partial class TopcvContext : DbContext
{
    public TopcvContext()
    {
    }

    public TopcvContext(DbContextOptions<TopcvContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<Application> Applications { get; set; }

    public virtual DbSet<Applicationstatus> Applicationstatuses { get; set; }

    public virtual DbSet<Jobcategory> Jobcategories { get; set; }

    public virtual DbSet<Jobpost> Jobposts { get; set; }

    public virtual DbSet<Jobpoststatus> Jobpoststatuses { get; set; }

    public virtual DbSet<Useremployer> Useremployers { get; set; }

    public virtual DbSet<Userjobseeker> Userjobseekers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    if (!optionsBuilder.IsConfigured)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();
        optionsBuilder.UseMySql(configuration.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(configuration.GetConnectionString("DefaultConnection")));
    }
}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.UserName).HasName("PRIMARY");

            entity.ToTable("admins");

            entity.Property(e => e.UserName).HasMaxLength(45);
            entity.Property(e => e.Avatar).HasMaxLength(45);
            entity.Property(e => e.Email).HasMaxLength(45);
            entity.Property(e => e.Password).HasMaxLength(225);
        });

        modelBuilder.Entity<Application>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("application");

            entity.HasIndex(e => e.JobPostId, "JobPost_idx");

            entity.HasIndex(e => e.Status, "Status_idx");

            entity.HasIndex(e => e.UserJobseeker, "UserJobseeker_idx");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ApplicationDate).HasColumnType("datetime");
            entity.Property(e => e.Cvfile)
                .HasMaxLength(255)
                .HasColumnName("CVFile");
            entity.Property(e => e.JobPostId).HasColumnName("JobPostID");
            entity.Property(e => e.UserJobseeker).HasMaxLength(45);

            entity.HasOne(d => d.JobPost).WithMany(p => p.Applications)
                .HasForeignKey(d => d.JobPostId)
                .HasConstraintName("FK_JobPostID");

            entity.HasOne(d => d.StatusNavigation).WithMany(p => p.Applications)
                .HasForeignKey(d => d.Status)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("StatusApplication");

            entity.HasOne(d => d.UserJobseekerNavigation).WithMany(p => p.Applications)
                .HasForeignKey(d => d.UserJobseeker)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserJobseeker");
        });

        modelBuilder.Entity<Applicationstatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("applicationstatus");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.StatusName).HasMaxLength(50);
        });

        modelBuilder.Entity<Jobcategory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobcategory");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.JobCategory1)
                .HasMaxLength(100)
                .HasColumnName("JobCategory");
        });

        modelBuilder.Entity<Jobpost>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobpost");

            entity.HasIndex(e => e.Company, "CompanyID_idx");

            entity.HasIndex(e => e.Status, "Status_idx");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Company)
                .HasMaxLength(45)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.JobDescription).HasColumnType("text");
            entity.Property(e => e.Location).HasMaxLength(255);
            entity.Property(e => e.PostDate).HasColumnType("datetime");
            entity.Property(e => e.Requirements).HasColumnType("text");
            entity.Property(e => e.SalaryRange).HasMaxLength(50);
            entity.Property(e => e.Title).HasMaxLength(255);

            entity.HasOne(d => d.CompanyNavigation).WithMany(p => p.Jobposts)
                .HasForeignKey(d => d.Company)
                .HasConstraintName("Company");

            entity.HasOne(d => d.StatusNavigation).WithMany(p => p.Jobposts)
                .HasForeignKey(d => d.Status)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Status");

            entity.HasMany(d => d.Categories).WithMany(p => p.JobPosts)
                .UsingEntity<Dictionary<string, object>>(
                    "Jobpostcategory",
                    r => r.HasOne<Jobcategory>().WithMany()
                        .HasForeignKey("CategoryId")
                        .HasConstraintName("Category"),
                    l => l.HasOne<Jobpost>().WithMany()
                        .HasForeignKey("JobPostId")
                        .HasConstraintName("JobPost"),
                    j =>
                    {
                        j.HasKey("JobPostId", "CategoryId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("jobpostcategory");
                        j.HasIndex(new[] { "CategoryId" }, "Category_idx");
                        j.IndexerProperty<int>("JobPostId").HasColumnName("JobPostID");
                        j.IndexerProperty<int>("CategoryId").HasColumnName("CategoryID");
                    });
        });

        modelBuilder.Entity<Jobpoststatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobpoststatus");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.StatusName).HasMaxLength(50);
        });

        modelBuilder.Entity<Useremployer>(entity =>
        {
            entity.HasKey(e => e.UserName).HasName("PRIMARY");

            entity
                .ToTable("useremployer")
                .HasCharSet("utf8mb3")
                .UseCollation("utf8mb3_general_ci");

            entity.Property(e => e.UserName).HasMaxLength(45);
            entity.Property(e => e.Avatar).HasMaxLength(45);
            entity.Property(e => e.CompanyAddress)
                .HasMaxLength(155)
                .UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");
            entity.Property(e => e.CompanyInfo)
                .HasColumnType("text")
                .UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");
            entity.Property(e => e.CompanyName)
                .HasMaxLength(255)
                .UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");
            entity.Property(e => e.PassWord).HasMaxLength(45);
        });

        modelBuilder.Entity<Userjobseeker>(entity =>
        {
            entity.HasKey(e => e.UserName).HasName("PRIMARY");

            entity.ToTable("userjobseeker");

            entity.Property(e => e.UserName).HasMaxLength(45);
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.Avatar).HasMaxLength(45);
            entity.Property(e => e.EducationLevel).HasMaxLength(50);
            entity.Property(e => e.ExperienceYears).HasMaxLength(50);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.PassWord).HasMaxLength(45);
            entity.Property(e => e.Skills).HasColumnType("text");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
