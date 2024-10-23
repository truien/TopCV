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

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Jobpost> Jobposts { get; set; }

    public virtual DbSet<Jobpostcategory> Jobpostcategories { get; set; }

    public virtual DbSet<Jobpoststatus> Jobpoststatuses { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Useremployer> Useremployers { get; set; }

    public virtual DbSet<Userjobseeker> Userjobseekers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseMySql("name=DefaultConnection", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.39-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

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

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("category");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.CategoryName).HasMaxLength(100);
        });

        modelBuilder.Entity<Jobpost>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobpost");

            entity.HasIndex(e => e.Status, "Status");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Company).HasMaxLength(100);
            entity.Property(e => e.JobDescription).HasColumnType("text");
            entity.Property(e => e.JobType).HasMaxLength(50);
            entity.Property(e => e.Location).HasMaxLength(100);
            entity.Property(e => e.Requirements).HasColumnType("text");
            entity.Property(e => e.SalaryRange).HasMaxLength(50);
            entity.Property(e => e.Title).HasMaxLength(100);

            entity.HasOne(d => d.StatusNavigation).WithMany(p => p.Jobposts)
                .HasForeignKey(d => d.Status)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("jobpost_ibfk_1");
        });

        modelBuilder.Entity<Jobpostcategory>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("jobpostcategory");

            entity.HasIndex(e => e.CategoryId, "CategoryID");

            entity.HasIndex(e => e.JobPostId, "JobPostID");

            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.JobPostId).HasColumnName("JobPostID");

            entity.HasOne(d => d.Category).WithMany()
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("jobpostcategory_ibfk_2");

            entity.HasOne(d => d.JobPost).WithMany()
                .HasForeignKey(d => d.JobPostId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("jobpostcategory_ibfk_1");
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
            entity
                .HasNoKey()
                .ToTable("useremployer");

            entity.HasIndex(e => e.UserName, "UserName");

            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.CompanyInfo).HasColumnType("text");
            entity.Property(e => e.CompanyName).HasMaxLength(100);
            entity.Property(e => e.UserName).HasMaxLength(50);

            entity.HasOne(d => d.UserNameNavigation).WithMany()
                .HasForeignKey(d => d.UserName)
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
