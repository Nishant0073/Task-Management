using System.ComponentModel.DataAnnotations;

namespace Task_Management.Models;

public class TokenRequestModel
{
    [Required]
    public string  Email{ get; set; }
    [Required]
    public string Password { get; set; }
}