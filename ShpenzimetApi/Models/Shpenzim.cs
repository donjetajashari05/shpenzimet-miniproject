namespace ShpenzimetApi.Models;

public class Shpenzim
{
    public int Id { get; set; }
    public string Pershkrimi { get; set; } = string.Empty;
    public decimal Shuma { get; set; }
    public DateTime Data { get; set; } = DateTime.UtcNow;

    public int KategoriaId { get; set; }
    public Kategoria? Kategoria { get; set; }
}