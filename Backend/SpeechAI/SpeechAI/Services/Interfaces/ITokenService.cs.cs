
using SpeechAI.Models;

namespace SpeechAI.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}
