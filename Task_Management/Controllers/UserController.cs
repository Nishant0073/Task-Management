using Microsoft.AspNetCore.Mvc;
using Task_Management.Models;
using Task_Management.Services;

namespace Task_Management.Controllers;

[Route("[controller]")]
[ApiController]
public class UserController(IUserService userService) : Controller
{
    private readonly IUserService _userService = userService;

    
    [HttpPost("register")]
    public async Task<ActionResult> RegisterAsync(RegisterModel model)
    {

        var result = await _userService.RegisterAsync(model);
        return Ok(result);
    }

    [HttpPost("Token")]
    public async Task<ActionResult> GetTokenAsync(TokenRequestModel model)
    {
        var result = await _userService.GetTokenAsync(model);
        return Ok(result);
    }
    
    [HttpPost("addrole")]
    public async Task<IActionResult> AddRoleAsync(AddRoleModel model)
    {
        var result = await _userService.AddRoleAsync(model);
        return Ok(result);
    }
}

