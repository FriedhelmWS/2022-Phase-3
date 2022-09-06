using Microsoft.AspNetCore.Mvc;
using System;



namespace Assignment.Controllers
{


    [ApiController]
    [Route("[controller]")]
    public class UtilityController : ControllerBase
    {

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
    }
}