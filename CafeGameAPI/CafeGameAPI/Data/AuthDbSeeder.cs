using CafeGameAPI.Auth.Models;
using Microsoft.AspNetCore.Identity;

namespace CafeGameAPI.Data
{
    public class AuthDbSeeder
    {
        private readonly UserManager<CafeGameUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthDbSeeder(UserManager<CafeGameUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            this._userManager = userManager;
            this._roleManager = roleManager;
        }

        public async Task SeedAsync()
        {
            await AddDefaultRoles();
            await AddAdminUser();
        }

        private async Task AddAdminUser()
        {
            var newAdminUser = new CafeGameUser()
            {
                UserName = "admin",
                Email = "admin@admin.com"
            };

            var existingAdminUser = await _userManager.FindByNameAsync(newAdminUser.UserName);
            if(existingAdminUser == null)
            {
                var createAdminUserResult = await _userManager.CreateAsync(newAdminUser, "Zagrybas1!");
                if (createAdminUserResult.Succeeded)
                    await _userManager.AddToRolesAsync(newAdminUser, UserRoles.All);
            }
        }

        private async Task AddDefaultRoles()
        {
            foreach(var role in UserRoles.All)
            {
                var roleExists = await _roleManager.RoleExistsAsync(role);
                if (!roleExists)
                    await _roleManager.CreateAsync(new IdentityRole(role));
            }
        }
    }
}
