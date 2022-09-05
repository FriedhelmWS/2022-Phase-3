using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Assignment.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountryController : ControllerBase
    {
        private readonly HttpClient _client;


        /// <summary />
        public CountryController(IHttpClientFactory clientFactory)
        {
            if (clientFactory is null)
            {
                throw new ArgumentNullException(nameof(clientFactory));
            }

            _client = clientFactory.CreateClient("country");
        }

        /// return exmaple of a country
        [HttpGet]
        [Route("try")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetExampleCountry()
        {
            var res = await _client.GetAsync("/v3.1/name/usa");
            var content = await res.Content.ReadAsStringAsync();

            return Ok(content);
        }

        // Search for captical city of a given country
        [HttpGet]
        [Route("capital")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetCapitalCity(String country)
        {
            try
            {
                var res = await _client.GetAsync("/v3.1/name/" + country);
                var content = await res.Content.ReadAsStringAsync();
                dynamic result = JArray.Parse(content);
                return Ok(JArray.Parse(JObject.Parse(result[0].ToString())["capital"].ToString())[0].ToString());
            } 
            catch 
            {
                return Ok("No result found!");
            }
        }
    }
}