using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CafeGameAPI.Auth
{
    public interface IJwtTokenService
    {
        string CreateAccessToken(string userName, string userId, IEnumerable<string> UserRoles);
    }

    public class JwtTokenService : IJwtTokenService
    {
        private SymmetricSecurityKey _authSignKey;
        private readonly string _issuer;
        private readonly string _audience;

        public JwtTokenService(IConfiguration configuration)
        {
            _authSignKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
            _issuer = configuration["JWT:ValidIssuer"];
            _audience = configuration["JWT:ValidAudience"];
        }

        public string CreateAccessToken(string userName, string userId, IEnumerable<string> UserRoles)
        {
            var authClaims = new List<Claim>
            {
                new(ClaimTypes.Name, userName),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Sub, userId)
            };

            authClaims.AddRange(UserRoles.Select(userRole => new Claim(ClaimTypes.Role, userRole)));

            var accessSecurityToken = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                expires: DateTime.UtcNow.AddMinutes(1), // TODO change to 5mins
                claims: authClaims,
                signingCredentials: new SigningCredentials(_authSignKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(accessSecurityToken);
        }
    }
}
