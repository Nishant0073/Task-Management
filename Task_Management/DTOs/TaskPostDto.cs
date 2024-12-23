using System.ComponentModel.DataAnnotations;
namespace Task_Management.DTOs;
using Task = Task_Management.Models.Task;

public class TaskPostDto
{
    /// <summary>
    /// <example>The Article Number 1</example>
    /// </summary>
    [Required]
    public string Title { get; set; }

    /// <summary>
    /// <example>The description of article number 1</example>
    /// </summary>
    public string Description { get; set; } = "";
    /// <summary>
    /// <example>12/12/2024</example>
    /// </summary>
    public DateTime DueDate { get; set; }
    /// <summary>
    /// <example>False</example>
    /// </summary>
    public bool IsComplete { get; set; }

    /// <summary>
    /// <example>High</example>
    /// </summary>
    public string Priority { get; set; } = "";


    public Task MapTaskPostDtoToTask()
    {
        return new Task()
        {
            Title = this.Title,
            Description = this.Description,
            DueDate = this.DueDate,
            IsComplete = this.IsComplete,
            Priority = this.Priority
        };
    }
}

