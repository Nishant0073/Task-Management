using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Task_Management.Data;
using Task_Management.DTOs;
using Task_Management.Repository;
using Task = Task_Management.Models.Task;

namespace Task_Management.Controllers;
[ApiController]
[Route("[controller]")]
public class TaskController: ControllerBase
{
    private Repository<Task> Repository { get; set; }
    private ILogger<TaskController> Logger { get; }
    public TaskController(ILogger<TaskController> logger,ApplicationDbContext context)
    {
        this.Repository = new Repository<Task>(context);
        this.Logger = logger;
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
    
    /// <summary>
    /// Fetch task with given id
    /// </summary>
    /// <param name="id"></param>
    /// <returns>Task</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<Task>> GetTask(int id)
    {
        try
        {
            
            Task task = await Repository.GetByIdAsync(id, new QueryOptions<Task>());
            return task!=null ? Ok(task) : NotFound();
        }
        catch (Exception e)
        {
            Logger.LogError(e.Message);
            return StatusCode(500);
        }
    }
    
    /// <summary>
    /// Add new Task 
    /// </summary>
    /// <param name="task"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<ActionResult<Task>> PostTask([FromQuery]TaskPostDto task)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            Task newTask = await Repository.AddAsync(task.MapTaskPostDtoToTask());
            return CreatedAtAction(nameof(GetTask), new { id = newTask.Id }, newTask);
        }
        catch (Exception e)
        {
            Logger.LogError("{controller} {method} :: "+ e.Message, this.ControllerContext.RouteData.Values["controller"], this.ControllerContext.RouteData.Values["action"]);
        } 
        return StatusCode(500);
    }

    ///<summary>
    /// Delete the task with given id
    /// <param name="id"></param>
    /// </summary> 
    [HttpDelete("{id}")]
    public async Task<ActionResult<Task>> DeleteTask(int id)
    {
        try
        {
            await Repository.DeleteAsync(id);
            return StatusCode(200, $"Task successfully deleted with Id: {id}");
        }
        catch (Exception e)
        {
            Logger.LogError("{controller} {method} :: "+ e.Message, this.ControllerContext.RouteData.Values["controller"], this.ControllerContext.RouteData.Values["action"]);
        }
        return StatusCode(500);
    }

    [HttpPut]
    public async Task<ActionResult<Task>> UpdateTask([FromQuery] Task task)
    {
        try
        {
            await Repository.UpdateAsync(task);
            return StatusCode(200, task);
        }
        catch (Exception e)
        {
            Logger.LogError("{controller} {method} :: "+ e.Message, this.ControllerContext.RouteData.Values["controller"], this.ControllerContext.RouteData.Values["action"]);
        }
        return StatusCode(500);
    }
}