using System.ComponentModel.DataAnnotations;

public class Player
{
    [Key] public int Id { get; set; }

    [Required] public string Name { get; set; }

    [Required] public int Xp { get; set; }

    public int NumOfCorrect { get; set; }
}