
using Microsoft.AspNetCore.Mvc;
using SpeechAI.DTOs;
using SpeechAI.Services.Interfaces;

namespace SpeechAI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(
            [FromBody] LoginRequest request)
        {
            var result = await _authService.LoginAsync(request);

            if (result == "Invalid email or password.")
            {
                return Unauthorized(new
                {
                    message = result
                });
            }

            return Ok(new
            {
                token = result
            });
        }
    }
}
