using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

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

    public virtual DbSet<Adminuser> Adminusers { get; set; }

    public virtual DbSet<Application> Applications { get; set; }

    public virtual DbSet<Applicationstatus> Applicationstatuses { get; set; }

    public virtual DbSet<Employmenttype> Employmenttypes { get; set; }

    public virtual DbSet<Jobfield> Jobfields { get; set; }

    public virtual DbSet<Jobpost> Jobposts { get; set; }

    public virtual DbSet<Jobpoststatus> Jobpoststatuses { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Useremployer> Useremployers { get; set; }

    public virtual DbSet<Userjobseeker> Userjobseekers { get; set; }
    public virtual DbSet<Jobpostfield> Jobpostfields { get; set; }
    public virtual DbSet<Jobpostemployment> Jobpostemployments { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseMySql("server=localhost;database=topcv;uid=root;pwd=admin", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.39-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");
        modelBuilder.Entity<Jobpostemployment>(entity =>
 {
     entity.HasKey(e => new { e.JobPostId, e.EmploymentId }).HasName("PRIMARY");

     entity.ToTable("jobpostemployment");

     entity.HasIndex(e => e.JobPostId, "JobPost_idx");
     entity.HasIndex(e => e.EmploymentId, "Employment_idx");

     entity.Property(e => e.JobPostId).HasColumnName("JobPostID");
     entity.Property(e => e.EmploymentId).HasColumnName("EmploymentID");

     entity.HasOne(d => d.JobPost)
         .WithMany(p => p.JobpostEmployments)
         .HasForeignKey(d => d.JobPostId)
         .OnDelete(DeleteBehavior.ClientSetNull)
         .HasConstraintName("FK_JobPost_Jobpostemployment");

     entity.HasOne(d => d.EmploymentType)
         .WithMany(p => p.Jobpostemployments)
         .HasForeignKey(d => d.EmploymentId)
         .OnDelete(DeleteBehavior.ClientSetNull)
         .HasConstraintName("FK_Employment_Jobpostemployment");
 });
        modelBuilder.Entity<Jobpostfield>()
           .HasKey(jp => new { jp.JobPostId, jp.JobFieldId }); // Khóa chính

        modelBuilder.Entity<Jobpostfield>()
           .HasKey(jp => new { jp.JobPostId, jp.JobFieldId }); // Đặt khóa chính cho bảng trung gian

        modelBuilder.Entity<Jobpostfield>()
            .HasOne(jp => jp.JobPost)
            .WithMany(j => j.Jobpostfields) // Thay 'JobFields' bằng 'Jobpostfields' cho chính xác
            .HasForeignKey(jp => jp.JobPostId);

        modelBuilder.Entity<Adminuser>(entity =>
        {
            entity.HasKey(e => e.UserName).HasName("PRIMARY");

            entity.ToTable("adminusers");

            entity.Property(e => e.UserName).HasMaxLength(50);

            entity.HasOne(d => d.UserNameNavigation).WithOne(p => p.Adminuser)
                .HasForeignKey<Adminuser>(d => d.UserName)
                .HasConstraintName("admin");
        });

        modelBuilder.Entity<Application>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("application");

            entity.HasIndex(e => e.JobPostId, "JobPostID");

            entity.HasIndex(e => e.Status, "Status");

            entity.HasIndex(e => e.UserJobseeker, "UserJobseeker");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Cvfile)
                .HasMaxLength(255)
                .HasColumnName("CVFile");
            entity.Property(e => e.JobPostId).HasColumnName("JobPostID");
            entity.Property(e => e.UserJobseeker).HasMaxLength(50);

            entity.HasOne(d => d.JobPost).WithMany(p => p.Applications)
                .HasForeignKey(d => d.JobPostId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("application_ibfk_1");

            entity.HasOne(d => d.StatusNavigation).WithMany(p => p.Applications)
                .HasForeignKey(d => d.Status)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("application_ibfk_3");

            entity.HasOne(d => d.UserJobseekerNavigation).WithMany(p => p.Applications)
                .HasForeignKey(d => d.UserJobseeker)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("application_ibfk_2");
        });

        modelBuilder.Entity<Applicationstatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("applicationstatus");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.StatusName).HasMaxLength(50);
        });

        modelBuilder.Entity<Employmenttype>(entity =>
{
    entity.HasKey(e => e.Id).HasName("PRIMARY");
    entity.ToTable("employmenttype");
    entity.Property(e => e.Id).HasColumnName("ID");
    entity.Property(e => e.EmploymentTypeName).HasMaxLength(100);

    entity.HasMany(e => e.IdjobPosts)
          .WithMany(j => j.IdemploymentTypes)
          .UsingEntity<Jobpostemployment>(
              j => j.HasOne(pt => pt.JobPost)
                    .WithMany(p => p.JobpostEmployments) // Tên collection cần khai báo trong Jobpost
                    .HasForeignKey(pt => pt.JobPostId)
                    .HasConstraintName("JobPost"),
              j => j.HasOne(pt => pt.EmploymentType)
                    .WithMany()
                    .HasForeignKey(pt => pt.EmploymentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("employment"),
              j =>
              {
                  j.HasKey(t => new { t.EmploymentId, t.JobPostId })
                   .HasName("PRIMARY");
                  j.ToTable("jobpostemployment");
                  j.HasIndex(pt => pt.JobPostId, "JobPost_idx");
              });
});

        modelBuilder.Entity<Jobfield>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobfield");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.JobField1)
                .HasMaxLength(100)
                .HasColumnName("JobField");
        });

        modelBuilder.Entity<Jobpost>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobpost");

            entity.HasIndex(e => e.Status, "Status");

            entity.HasIndex(e => e.UserEmployer, "UserEmploy_idx");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Company).HasMaxLength(100);
            entity.Property(e => e.JobDescription).HasColumnType("text");
            entity.Property(e => e.Location).HasMaxLength(100);
            entity.Property(e => e.Requirements).HasColumnType("text");
            entity.Property(e => e.SalaryRange).HasMaxLength(50);
            entity.Property(e => e.Title).HasMaxLength(100);
            entity.Property(e => e.UserEmployer).HasMaxLength(50);

            entity.HasOne(d => d.StatusNavigation).WithMany(p => p.Jobposts)
                .HasForeignKey(d => d.Status)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("jobpost_ibfk_1");

            entity.HasOne(d => d.UserEmployerNavigation).WithMany(p => p.Jobposts)
                .HasForeignKey(d => d.UserEmployer)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("UserEmploy");

            modelBuilder.Entity<Jobpostfield>(entity =>
{
    entity.HasKey(jp => new { jp.JobPostId, jp.JobFieldId });

    entity.ToTable("jobpostfield");

    entity.Property(jp => jp.JobPostId).HasColumnName("JobPostID");
    entity.Property(jp => jp.JobFieldId).HasColumnName("JobFieldID");

    entity.HasOne(jp => jp.JobPost)
        .WithMany(j => j.Jobpostfields)
        .HasForeignKey(jp => jp.JobPostId);

    entity.HasOne(jp => jp.JobField)
        .WithMany()
        .HasForeignKey(jp => jp.JobFieldId);
});
        });

        modelBuilder.Entity<Jobpoststatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobpoststatus");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.StatusName).HasMaxLength(50);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserName).HasName("PRIMARY");

            entity.ToTable("users");

            entity.Property(e => e.UserName).HasMaxLength(50);
            entity.Property(e => e.Avatar).HasMaxLength(255);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Password).HasMaxLength(255);
        });

        modelBuilder.Entity<Useremployer>(entity =>
        {
            entity.HasKey(e => e.UserName).HasName("PRIMARY");

            entity.ToTable("useremployer");

            entity.Property(e => e.UserName).HasMaxLength(50);
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.CompanyInfo).HasColumnType("text");
            entity.Property(e => e.CompanyName).HasMaxLength(100);

            entity.HasOne(d => d.UserNameNavigation).WithOne(p => p.Useremployer)
                .HasForeignKey<Useremployer>(d => d.UserName)
                .HasConstraintName("useremployer_ibfk_1");
        });

        modelBuilder.Entity<Userjobseeker>(entity =>
        {
            entity.HasKey(e => e.UserName).HasName("PRIMARY");

            entity.ToTable("userjobseeker");

            entity.Property(e => e.UserName).HasMaxLength(50);
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.EducationLevel).HasMaxLength(50);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.Skills).HasColumnType("text");

            entity.HasOne(d => d.UserNameNavigation).WithOne(p => p.Userjobseeker)
                .HasForeignKey<Userjobseeker>(d => d.UserName)
                .HasConstraintName("userjobseeker_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
