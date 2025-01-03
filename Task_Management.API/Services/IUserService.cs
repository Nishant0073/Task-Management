using Task_Management.Models;

namespace Task_Management.Services;

public interface IUserService
{
    Task<RegisterResponse> RegisterAsync(RegisterModel registerModel);
    Task<AuthenticationModel> GetTokenAsync(TokenRequestModel requestModel);
    Task<string> AddRoleAsync(AddRoleModel model);
}