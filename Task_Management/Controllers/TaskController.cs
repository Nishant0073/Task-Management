using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Task_Management.Data;
using Task_Management.Repository;
using Task = Task_Management.Models.Task;

namespace Task_Management.Controllers;
[ApiController]
[Route("[controller]")]
public class TaskController: ControllerBase
{
    public Repository<Task> Repository { get; set; }
    public TaskController(ILogger<TaskController> logger,ApplicationDbContext context)
    {
        this.Repository = new Repository<Task>(context);
    }
    
    /// <summary>
    /// Fetch all the tasks.
    /// </summary>
    /// <returns>An enumerable collection of tasks.</returns>
    [HttpGet]
    public async Task<IEnumerable<Task>> GetTasks()
    {
        return await Repository.GetAllAsync();
    }
    
}