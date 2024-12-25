using Microsoft.AspNetCore.Identity;
using Task_Management.Models;
using Task_Management.Settings;

namespace Task_Management.Services;

public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly Jwt _jwt;

    public UserService(Jwt jwt, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _jwt = jwt;
        _userManager = userManager;
        _roleManager = roleManager;
    }
}