using Microsoft.AspNetCore.Identity;

namespace Task_Management.Models;

public class ApplicationUser: IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
}