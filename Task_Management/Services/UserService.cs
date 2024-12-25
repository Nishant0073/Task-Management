using System.Net;
using Microsoft.AspNetCore.Identity;
using Task_Management.Models;
using Task_Management.Settings;
using Authorization = Task_Management.Constants.Authorization;

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

    public async Task<string> RegisterAsync(RegisterModel registerModel)
    {
        var user = new ApplicationUser
        {
            Email = registerModel.Email,
            UserName = registerModel.Email,
            FirstName = registerModel.FirstName,
            LastName = registerModel.LastName,
        };
        
        var userWithSameEmil = await _userManager.FindByEmailAsync(registerModel.Email);
        if (userWithSameEmil == null)
        {
            var result = await _userManager.CreateAsync(user, registerModel.Password);
            if(!result.Succeeded)
                await _userManager.AddToRoleAsync(user, Authorization.default_role.ToString());
            return $"User with email {registerModel.Email} has been registered";
        }
        return $"User with email {registerModel.Email} is already registered";
    }
}