using Microsoft.EntityFrameworkCore;

namespace Assignment.Data;

public class WebAPIDBContext : DbContext
{
    public WebAPIDBContext(DbContextOptions<WebAPIDBContext> options) : base(options)
    {
    }

    public DbSet<Player> Players { get; set; }
}