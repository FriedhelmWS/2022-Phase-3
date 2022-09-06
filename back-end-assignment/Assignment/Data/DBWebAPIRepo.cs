namespace Assignment.Data;

public class DBWebAPIRepo : IWebAPIRepo
{
    private readonly WebAPIDBContext _dbcontext;

    public DBWebAPIRepo(WebAPIDBContext dbcontext)
    {
        _dbcontext = dbcontext;
    }

    public Player AddPlayer(Player p)
    {
        var e = _dbcontext.Players.Add(p);
        var player = e.Entity;
        _dbcontext.SaveChanges();
        return player;
    }

    public Player GetPlayerById(int id)
    {
        var p = _dbcontext.Players.FirstOrDefault(e => e.Id == id);
        return p;
    }

    public Player GetPlayerByName(String name)
    {
        var p = _dbcontext.Players.FirstOrDefault(e => e.Name == name);
        return p;
    }

    public IEnumerable<Player> GetPlayers()
    {
        IEnumerable<Player> players = _dbcontext.Players.ToList();
        return players;
    }

    public Player UpdatePlayer(Player player)
    {
        var e = _dbcontext.Players.Update(player);
        var p = e.Entity;
        _dbcontext.SaveChanges();
        return p;
    }

}