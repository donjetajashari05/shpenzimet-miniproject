using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShpenzimetApi.Data;
using ShpenzimetApi.DTOs;
using ShpenzimetApi.Models;

namespace ShpenzimetApi.Controllers;

[ApiController]
[Route("api/[controller]")]   
public class KategoriteController : ControllerBase
{
    private readonly AppDbContext _db;

   
    public KategoriteController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<List<KategoriaDto>>> GetAll()
    {
        var kategorite = await _db.Kategorite
            .OrderBy(k => k.Emri)
            .Select(k => new KategoriaDto(k.Id, k.Emri, k.Ngjyra, k.Shpenzimet.Count))
            .ToListAsync();

        return Ok(kategorite);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<KategoriaDto>> GetById(int id)
    {
        var kategoria = await _db.Kategorite
            .Where(k => k.Id == id)
            .Select(k => new KategoriaDto(k.Id, k.Emri, k.Ngjyra, k.Shpenzimet.Count))
            .FirstOrDefaultAsync();

        if (kategoria is null)
            return NotFound(new { message = $"Kategoria me id {id} nuk ekziston." });

        return Ok(kategoria);
    }

    [HttpPost]
    public async Task<ActionResult<KategoriaDto>> Create(KategoriaInputDto dto)
    {
        var emri = dto.Emri.Trim();

        if (await _db.Kategorite.AnyAsync(k => k.Emri.ToLower() == emri.ToLower()))
            return Conflict(new { message = $"Kategoria '{emri}' ekziston tashmë." });

        var kategoria = new Kategoria { Emri = emri, Ngjyra = dto.Ngjyra };
        _db.Kategorite.Add(kategoria);
        await _db.SaveChangesAsync();

        var rezultati = new KategoriaDto(kategoria.Id, kategoria.Emri, kategoria.Ngjyra, 0);
        return CreatedAtAction(nameof(GetById), new { id = kategoria.Id }, rezultati);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, KategoriaInputDto dto)
    {
        var kategoria = await _db.Kategorite.FindAsync(id);
        if (kategoria is null)
            return NotFound(new { message = $"Kategoria me id {id} nuk ekziston." });

        var emri = dto.Emri.Trim();
        if (await _db.Kategorite.AnyAsync(k => k.Id != id && k.Emri.ToLower() == emri.ToLower()))
            return Conflict(new { message = $"Kategoria '{emri}' ekziston tashmë." });

        kategoria.Emri = emri;
        kategoria.Ngjyra = dto.Ngjyra;
        await _db.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete( int id)
    {
        var kategoria = await _db.Kategorite.FindAsync(id);
        if (kategoria is null)
            return NotFound(new { message = $"Kategoria me id {id} nuk ekziston." });

        if (await _db.Shpenzimet.AnyAsync(s => s.KategoriaId == id))
            return BadRequest(new { message = "Kjo kategori ka shpenzime dhe nuk mund të fshihet." });

        _db.Kategorite.Remove(kategoria);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}