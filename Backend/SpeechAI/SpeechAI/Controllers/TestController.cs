
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace SpeechAI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet("protected")]
        [Authorize]
        public IActionResult Protected()
        {
            return Ok(new
            {
                message = "You have successfully accessed a protected endpoint!",
                userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value,
                firstName = User.FindFirst(ClaimTypes.GivenName)?.Value,
                lastName = User.FindFirst(ClaimTypes.Surname)?.Value,
                email = User.FindFirst(ClaimTypes.Email)?.Value
            });
        }
    }
}
