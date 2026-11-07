using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
                userId = User.FindFirst(
                    System.Security.Claims.ClaimTypes.NameIdentifier
                )?.Value,
                email = User.FindFirst(
                    System.Security.Claims.ClaimTypes.Email
                )?.Value
            });
        }
    }
}