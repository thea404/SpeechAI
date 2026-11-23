
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

        // REGISTER
        [HttpPost("register")]
        public async Task<IActionResult> Register(
            [FromBody] RegisterRequest request)
        {
            var result = await _authService.RegisterAsync(request);

            if (result == "Email already exists.")
            {
                return Conflict(new
                {
                    message = result
                });
            }

            return Ok(new
            {
                message = result
            });
        }

        // LOGIN
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
