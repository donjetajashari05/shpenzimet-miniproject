using System.ComponentModel.DataAnnotations;

namespace ShpenzimetApi.DTOs;

public record ShpenzimDto(
    int Id,
    string Pershkrimi,
    decimal Shuma,
    DateTime Data,
    int KategoriaId,
    string KategoriaEmri,
    string KategoriaNgjyra);

public class ShpenzimInputDto
{
    [Required(ErrorMessage = "Përshkrimi është i detyrueshëm.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Përshkrimi duhet të ketë 2 deri 100 karaktere.")]
    public string Pershkrimi { get; set; } = string.Empty;

    [Range(0.01, 1_000_000, ErrorMessage = "Shuma duhet të jetë mes 0.01 dhe 1,000,000.")]
    public decimal Shuma { get; set; }

    public DateTime? Data { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Zgjidh një kategori të vlefshme.")]
    public int KategoriaId { get; set; }
}