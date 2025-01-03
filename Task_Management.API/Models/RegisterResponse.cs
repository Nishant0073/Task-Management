using System.Text.Json.Serialization;

namespace Task_Management.Models;

public class RegisterResponse
{
    [JsonPropertyName("message")]
    public string message { get; set; }
    [JsonPropertyName("errorCode")]
    public int errorCode { get; set; }
}