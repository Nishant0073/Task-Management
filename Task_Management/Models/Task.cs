using System.ComponentModel.DataAnnotations;

namespace Task_Management.Models;

public class Task
{
    [Required]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public bool IsComplete { get; set; }
    public string Priority { get; set; }
    public int UserId { get; set; }
}
