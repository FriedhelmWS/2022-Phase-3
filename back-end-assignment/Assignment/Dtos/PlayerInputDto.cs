using System.ComponentModel.DataAnnotations;

namespace Assignment.Dtos;

public class PlayerInputDto
{
    [Required] public string Name { 
        get;
        set; 
    }

    [Required] public int Xp { 
        get; 
        set; 
    }

    public int NumOfCorrect { 
        get; 
        set; 
    }
}