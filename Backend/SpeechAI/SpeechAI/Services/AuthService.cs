
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SpeechAI.Data;
using SpeechAI.DTOs;
using SpeechAI.Models;
using SpeechAI.Services.Interfaces;

namespace SpeechAI.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly ITokenService _tokenService;

        public AuthService(
            ApplicationDbContext context,
            IPasswordHasher<User> passwordHasher,
            ITokenService tokenService)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _tokenService = tokenService;
        }

        // LOGIN
        public async Task<string> LoginAsync(LoginRequest request)
        {
            // Normalize email
            string normalizedEmail = request.Email.Trim().ToLowerInvariant();

            // Find user by email
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == normalizedEmail);

            // Check if user exists
            if (user == null)
            {
                return "Invalid email or password.";
            }

            // Verify password
            var passwordResult = _passwordHasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                request.Password
            );

            if (passwordResult == PasswordVerificationResult.Failed)
            {
                return "Invalid email or password.";
            }

            string token = _tokenService.GenerateToken(user);

            return token;
        }

        // REGISTER
        public async Task<string> RegisterAsync(RegisterRequest request)
        {
            // Normalize email
            string normalizedEmail = request.Email.Trim().ToLowerInvariant();

            // Check if email already exists
            bool emailExists = await _context.Users
                .AnyAsync(u => u.Email == normalizedEmail);

            if (emailExists)
            {
                return "Email already exists.";
            }

            // Create new user
            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = normalizedEmail,
                CreatedAt = DateTime.UtcNow,
                IsEmailVerified = false
            };

            // Hash the password
            user.PasswordHash = _passwordHasher.HashPassword(
                user,
                request.Password
            );

            // Save user to database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return "Registration successful.";
        }
    }
}
