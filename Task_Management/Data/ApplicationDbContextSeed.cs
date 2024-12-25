using Microsoft.AspNetCore.Identity;
using Task_Management.Constants;
using Task_Management.Models;
using Task = System.Threading.Tasks.Task;

namespace Task_Management.Data;

public class ApplicationDbContextSeed
{
    public static async Task SeedAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        await roleManager.CreateAsync(new IdentityRole(Authorization.Roles.Admin.ToString()));
        await roleManager.CreateAsync(new IdentityRole(Authorization.Roles.User.ToString()));

        var defaultUser = new ApplicationUser
        {
            UserName = Authorization.default_username,
            Email = Authorization.default_email,
            EmailConfirmed = true,
            PhoneNumberConfirmed = true,
        };

        if (userManager.Users.All(u => u.Id != defaultUser.Id))
        {
           await userManager.CreateAsync(defaultUser, Authorization.default_password);
           await userManager.AddToRoleAsync(defaultUser, Authorization.Roles.User.ToString());
        }
    }
}