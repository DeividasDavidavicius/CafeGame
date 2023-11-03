using Microsoft.AspNetCore.Identity;

namespace CafeGameAPI.Auth.Models
{
    public class CafeGameUser : IdentityUser
    {
        public bool Relogin { get; set; } // ForceRelogin
    }
}
