using System.ComponentModel.DataAnnotations;

namespace ShpenzimetApi.DTOs;

public record KategoriaDto(int Id, string Emri, string Ngjyra, int NumriShpenzimeve);

public class KategoriaInputDto
{
    [Required(ErrorMessage = "Emri është i detyrueshëm.")]
    [StringLength(50, MinimumLength = 2, ErrorMessage = "Emri duhet të ketë 2 deri 50 karaktere.")]
    public string Emri { get; set; } = string.Empty;

    [RegularExpression("^#[0-9A-Fa-f]{6}$", ErrorMessage = "Ngjyra duhet të jetë në formatin #RRGGBB.")]
    public string Ngjyra { get; set; } = "#888888";
}