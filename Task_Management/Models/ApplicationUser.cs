using Microsoft.AspNetCore.Identity;
using Task = Task_Management.Models.Task;

namespace Task_Management.Models;

public class ApplicationUser: IdentityUser
{
    
    
    public string FirstName { get; set; }
    public string LastName { get; set; }
    
    public virtual ICollection<Task> Tasks{ get; set; }
}
