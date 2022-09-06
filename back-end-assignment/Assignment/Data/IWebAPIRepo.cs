namespace Assignment.Data;

public interface IWebAPIRepo
{
    IEnumerable<Player> GetPlayers();
    Player GetPlayerById(int id);
    Player GetPlayerByName(String name);
    Player AddPlayer(Player customer);
    Player UpdatePlayer(Player player);
}