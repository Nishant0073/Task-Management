using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Task_Management.Enums;

namespace Task_Management.Models;

public class Task
{
    [Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }

    public string Description { get; set; } = "";
    public DateTime DueDate { get; set; }
    public bool IsComplete { get; set; }
    
    [JsonConverter(typeof(JsonStringEnumConverter))] 
    public PriorityEnum Priority { get; set; }
    
    [ForeignKey("UserId")] 
    public virtual ApplicationUser User { get; set; } 

    public string UserId { get; set; }
}
