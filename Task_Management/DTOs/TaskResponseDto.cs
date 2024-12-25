using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Task_Management.Enums;
using Task = Task_Management.Models.Task;
namespace Task_Management.DTOs;

public class TaskResponseDto
{
    public TaskResponseDto(Task task)
    {
        this.Id = task.Id;
        this.Title = task.Title;
        this.Description = task.Description;
        this.DueDate = task.DueDate;
        this.IsComplete = task.IsComplete;
        this.Priority = task.Priority;
    }
    [Required]
    public int Id { get; set; }
    /// <summary>
    /// <example>The Task Number 1</example>
    /// </summary>
    [Required]
    public string Title { get; set; }

    /// <summary>
    /// <example>The description of task number 1</example>
    /// </summary>
    public string Description { get; set; } = "";
    /// <summary>
    /// <example>12/31/2024</example>
    /// </summary>
    public DateTime DueDate { get; set; }
    /// <summary>
    /// <example>False</example>
    /// </summary>
    public bool IsComplete { get; set; }

    /// <summary>
    /// <example>High</example>
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))] 
    public PriorityEnum Priority { get; set; }

}