using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShpenzimetApi.Data;
using ShpenzimetApi.DTOs;
using ShpenzimetApi.Models;

namespace ShpenzimetApi.Controllers;

[ApiController]
[Route("api/[controller]")]  
public class ShpenzimetController : ControllerBase
{
    private readonly AppDbContext _db;

    public ShpenzimetController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<List<ShpenzimDto>>> GetAll(
        [FromQuery] int? kategoriaId,
        [FromQuery] string? kerko,
        [FromQuery] DateTime? nga,
        [FromQuery] DateTime? deri)
    {
        IQueryable<Shpenzim> query = _db.Shpenzimet;

        if (kategoriaId.HasValue)
            query = query.Where(s => s.KategoriaId == kategoriaId.Value);

        if (!string.IsNullOrWhiteSpace(kerko))
        {
            var fjala = kerko.Trim().ToLower();
            query = query.Where(s => s.Pershkrimi.ToLower().Contains(fjala));
        }

        if (nga.HasValue)
            query = query.Where(s => s.Data >= nga.Value);

        if (deri.HasValue)
            query = query.Where(s => s.Data <= deri.Value);

        var shpenzimet = await query
            .OrderByDescending(s => s.Data)
            .Select(s => new ShpenzimDto(
                s.Id, s.Pershkrimi, s.Shuma, s.Data,
                s.KategoriaId, s.Kategoria!.Emri, s.Kategoria.Ngjyra))
            .ToListAsync();

        return Ok(shpenzimet);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ShpenzimDto>> GetById(int id)
    {
        var shpenzimi = await _db.Shpenzimet
            .Where(s => s.Id == id)
            .Select(s => new ShpenzimDto(
                s.Id, s.Pershkrimi, s.Shuma, s.Data,
                s.KategoriaId, s.Kategoria!.Emri, s.Kategoria.Ngjyra))
            .FirstOrDefaultAsync();

        if (shpenzimi is null)
            return NotFound(new { message = $"Shpenzimi me id {id} nuk ekziston." });

        return Ok(shpenzimi);
    }

    [HttpPost]
    public async Task<ActionResult<ShpenzimDto>> Create(ShpenzimInputDto dto)
    {
        var kategoria = await _db.Kategorite.FindAsync(dto.KategoriaId);
        if (kategoria is null)
            return BadRequest(new { message = $"Kategoria me id {dto.KategoriaId} nuk ekziston." });

        var shpenzimi = new Shpenzim
        { 
            Pershkrimi = dto.Pershkrimi.Trim(),
            Shuma = dto.Shuma,
            Data = dto.Data ?? DateTime.UtcNow,
            KategoriaId = dto.KategoriaId
        };

        _db.Shpenzimet.Add(shpenzimi);
        await _db.SaveChangesAsync();

        var rezultati = new ShpenzimDto(
            shpenzimi.Id, shpenzimi.Pershkrimi, shpenzimi.Shuma, shpenzimi.Data,
            kategoria.Id, kategoria.Emri, kategoria.Ngjyra);

        return CreatedAtAction(nameof(GetById), new { id = shpenzimi.Id }, rezultati);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, ShpenzimInputDto dto)
    {
        var shpenzimi = await _db.Shpenzimet.FindAsync(id);
        if (shpenzimi is null)
            return NotFound(new { message = $"Shpenzimi me id {id} nuk ekziston." });

        if (!await _db.Kategorite.AnyAsync(k => k.Id == dto.KategoriaId))
            return BadRequest(new { message = $"Kategoria me id {dto.KategoriaId} nuk ekziston." });

        shpenzimi.Pershkrimi = dto.Pershkrimi.Trim();
        shpenzimi.Shuma = dto.Shuma;
        shpenzimi.Data = dto.Data ?? shpenzimi.Data;
        shpenzimi.KategoriaId = dto.KategoriaId;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var shpenzimi = await _db.Shpenzimet.FindAsync(id);
        if (shpenzimi is null)
            return NotFound(new { message = $"Shpenzimi me id {id} nuk ekziston." });

        _db.Shpenzimet.Remove(shpenzimi);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}