namespace ShpenzimetApi.Models;

public class Kategoria
{
    public int Id { get; set; }
    public string Emri { get; set; } = string.Empty;

    public string Ngjyra { get; set; } = "#888888";

    // Navigation property: një kategori ka shumë shpenzime (one-to-many)
    public List<Shpenzim> Shpenzimet { get; set; } = new();
}