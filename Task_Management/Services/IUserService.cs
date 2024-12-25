using Task_Management.Models;

namespace Task_Management.Services;

public interface IUserService
{
    Task<string> RegisterAsync(RegisterModel registerModel);
    Task<AuthenticationModel> GetTokenAsync(TokenRequestModel requestModel);
}