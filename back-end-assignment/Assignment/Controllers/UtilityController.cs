using Assignment.Data;
using Assignment.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;



namespace Assignment.Controllers
{


    [ApiController]
    [Route("[controller]")]
    public class UtilityController : ControllerBase
    {

        private readonly IWebAPIRepo _repo;

        public UtilityController(IWebAPIRepo repo)
        {
            _repo = repo;
        }

        public static string[] emojis = { "😀", "😅", "😠", "😕", "😧" };

        // Flip a coin
        [HttpGet]
        [Route("coin")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public IActionResult GetFlippingCoin()
        {
            string[] coin = { "head", "tail"};

            return Ok(coin[new Random().Next(0, coin.Length)]);
        }

        // Get a emoji
        [HttpGet]
        [Route("emoji")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public IActionResult GetAEmoji()
        {
            return Ok(emojis[new Random().Next(0, emojis.Length)]);
        }

        // Add a exmaple 😮 emoji
        [HttpPut]
        [Route("add")]
        [ProducesResponseType(201)]
        public IActionResult AddExampleEmoji()
        {
            emojis = emojis.Concat(new String[] { "😮" }).ToArray(); ;
            return Created(new Uri("https://www.google.com"), "😮");
        }

        // Add a emoji
        [HttpPost]
        [Route("add")]
        [ProducesResponseType(201)]
        public IActionResult GetSum(String emoji)
        { 
            emojis = emojis.Concat(new String[] { emoji }).ToArray(); ;
            return Created(new Uri("https://www.google.com"), "Emoji Added!");
        }

        [HttpGet("list_players")]
        public ActionResult<IEnumerable<Player>> GetCustomers()
        {
            var res = _repo.GetPlayers();
            var c = res.Select(e => new PlayerOutDto { Id = e.Id, Name = e.Name, Xp = e.Xp });
            return Ok(c);
        }

        [HttpGet]
        [Route("login")]
        [ProducesResponseType(200)]
        public IActionResult LoginUser(String name)
        {
            var tempPlayer = _repo.GetPlayerByName(name);
            if (tempPlayer == null)
            {
                return Ok(tempPlayer);
            }
            else
            {
                var p = new Player
                {
                    Name = name,
                    Xp = 0,
                    NumOfCorrect = 0
                };
                var addedCustomer = _repo.AddPlayer(p);
                return Ok(addedCustomer);
            }
            
        }

        [HttpPost]
        [Route("corrrect")]
        [ProducesResponseType(200)]
        public IActionResult DoingCorrect(String name)
        {

            var player = _repo.GetPlayerByName(name);
            if (player == null) 
            { 
                return NotFound();
            }
            else
            {
                player.Xp = player.Xp + 50;
                player.NumOfCorrect = player.NumOfCorrect + 1;
                _repo.UpdatePlayer(player);
            }


            return Ok();

        }

        [HttpPost]
        [Route("wrong")]
        [ProducesResponseType(200)]
        public IActionResult DoingWrong(String name)
        {

            var player = _repo.GetPlayerByName(name);
            if (player == null)
            {
                return NotFound();
            }
            else
            {
                player.Xp = player.Xp + 10;
                _repo.UpdatePlayer(player);
            }


            return Ok();

        }
    }
}