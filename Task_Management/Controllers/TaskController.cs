using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Task_Management.Data;
using Task_Management.DTOs;
using Task_Management.Repository;
using Task = Task_Management.Models.Task;

namespace Task_Management.Controllers;
[Authorize]
[ApiController]
[Route("[controller]")]
public class TaskController(ApplicationDbContext context) : ControllerBase
{
    private Repository<Task> Repository { get; set; } = new(context);

    /// <summary>
    /// Fetch all the tasks.
    /// </summary>
    /// <returns>An enumerable collection of tasks.</returns>
    [HttpGet]
    public async Task<List<TaskResponseDto>> GetTasks()
    {
        IEnumerable<Task> tasks = await Repository.GetAllAsync();
        return tasks.Select(task => new TaskResponseDto(task)).ToList();
    }
    
    /// <summary>
    /// Fetch task with given id
    /// </summary>
    /// <param name="id"></param>
    /// <returns>Task</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskResponseDto>> GetTask(int id)
    {
        Task task = await Repository.GetByIdAsync(id, new QueryOptions<Task>());
        if (task is not null)
        {
           return Ok(new TaskResponseDto(task));
        }
        else
        {
            return NotFound();
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
        Task newTask = await Repository.AddAsync(task.MapTaskPostDtoToTask());
        return CreatedAtAction(nameof(GetTask), new { id = newTask.Id }, newTask);
    }

    ///<summary>
    /// Delete the task with given id
    /// <param name="id"></param>
    /// </summary> 
    [HttpDelete("{id}")]
    public async Task<ActionResult<string>> DeleteTask(int id)
    {
        await Repository.DeleteAsync(id);
        return StatusCode(200, $"Task successfully deleted with Id: {id}");
    }

    [HttpPut]
    public async Task<ActionResult<TaskResponseDto>> UpdateTask([FromQuery] TaskPutDto task)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        Task updateTask = await Repository.UpdateAsync(task.MapTaskPutDtoToTask());
        TaskResponseDto taskResponseDto = new(updateTask);
        return StatusCode(200,taskResponseDto);
    }
}