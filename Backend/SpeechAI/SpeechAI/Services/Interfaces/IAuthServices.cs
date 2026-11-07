
using SpeechAI.DTOs;

namespace SpeechAI.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterRequest request);

        Task<string> LoginAsync(LoginRequest request);
    }
}
