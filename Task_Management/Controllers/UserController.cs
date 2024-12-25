using Microsoft.AspNetCore.Mvc;
using Task_Management.Services;

namespace Task_Management.Controllers;

[Route("[controller]")]
[ApiController]
public class UserController(IUserService userService) : Controller
{
    private readonly IUserService _userService = userService;
    
}