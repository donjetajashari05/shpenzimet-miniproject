using Microsoft.EntityFrameworkCore;
using ShpenzimetApi.Models;

namespace ShpenzimetApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // Secili DbSet bëhet një tabelë në databazë
    public DbSet<Shpenzim> Shpenzimet => Set<Shpenzim>();
    public DbSet<Kategoria> Kategorite => Set<Kategoria>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Shpenzim>()
            .Property(s => s.Shuma)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Shpenzim>()
            .HasOne(s => s.Kategoria)
            .WithMany(k => k.Shpenzimet)
            .HasForeignKey(s => s.KategoriaId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Kategoria>()
            .HasIndex(k => k.Emri)
            .IsUnique();

       
        modelBuilder.Entity<Kategoria>().HasData(
            new Kategoria { Id = 1, Emri = "Ushqim", Ngjyra = "#4CAF50" },
            new Kategoria { Id = 2, Emri = "Transport", Ngjyra = "#2196F3" },
            new Kategoria { Id = 3, Emri = "Argëtim", Ngjyra = "#FF9800" },
            new Kategoria { Id = 4, Emri = "Fatura", Ngjyra = "#F44336" },
            new Kategoria { Id = 5, Emri = "Tjetër", Ngjyra = "#9E9E9E" }
        );
    }
}