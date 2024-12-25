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
}