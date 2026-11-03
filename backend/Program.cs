using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// SQLite database stored in notes.db next to the project
builder.Services.AddDbContext<NotesDb>(options => options.UseSqlite("Data Source=notes.db"));

// Allow the React dev server to call this API
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5180").AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();
app.UseCors();

// Create the database and table on first run
using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<NotesDb>().Database.EnsureCreated();
}

// GET /api/notes - list all notes
app.MapGet("/api/notes", async (NotesDb db) =>
    await db.Notes.OrderByDescending(n => n.Id).ToListAsync());

// POST /api/notes - add a note
app.MapPost("/api/notes", async (Note note, NotesDb db) =>
{
    if (string.IsNullOrWhiteSpace(note.Text)) return Results.BadRequest("Text is required");

    db.Notes.Add(note);
    await db.SaveChangesAsync();
    return Results.Created($"/api/notes/{note.Id}", note);
});

// DELETE /api/notes/{id} - delete a note
app.MapDelete("/api/notes/{id:int}", async (int id, NotesDb db) =>
{
    var note = await db.Notes.FindAsync(id);
    if (note is null) return Results.NotFound();

    db.Notes.Remove(note);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();

public class Note
{
    public int Id { get; set; }
    public string Text { get; set; } = "";
}

public class NotesDb(DbContextOptions<NotesDb> options) : DbContext(options)
{
    public DbSet<Note> Notes => Set<Note>();
}
