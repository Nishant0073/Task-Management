using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Task_Management.Models;
using Task_Management.Settings;
using Authorization = Task_Management.Constants.Authorization;

namespace Task_Management.Services;

public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly Jwt _jwt;

    public UserService(Jwt jwt, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _jwt = jwt;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<RegisterResponse> RegisterAsync(RegisterModel registerModel)
    {
        RegisterResponse registerResponse = new RegisterResponse();
        var user = new ApplicationUser
        {
            Email = registerModel.Email,
            UserName = registerModel.Email,
            FirstName = registerModel.FirstName,
            LastName = registerModel.LastName,
        };
        
        var userWithSameEmil = await _userManager.FindByEmailAsync(registerModel.Email);
        if (userWithSameEmil == null)
        {
            var result = await _userManager.CreateAsync(user, registerModel.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, Authorization.default_role.ToString());
            }
            
            registerResponse.message = $"User with email {registerModel.Email} has been registered";
            registerResponse.errorCode = 00;
            
            return registerResponse;
        }

        registerResponse.message =  $"User with email {registerModel.Email} is already registered";
        registerResponse.errorCode = 01;
        return registerResponse;
    }

    public async Task<AuthenticationModel> GetTokenAsync(TokenRequestModel requestModel)
    {
        var authenticationModel = new AuthenticationModel();
        ApplicationUser user = await _userManager.FindByEmailAsync(requestModel.Email);
        if (user == null)
        {
            authenticationModel.IsAuthenticated = false;
            authenticationModel.Message = $"No account registered with {requestModel.Email} email";
            return authenticationModel;
        }

        if (await _userManager.CheckPasswordAsync(user, requestModel.Password))
        {
           authenticationModel.IsAuthenticated = true;
           JwtSecurityToken jwtSecurityToken = await CreateJwtToken(user);
           authenticationModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
           authenticationModel.Email = user.Email;
           authenticationModel.Username = user.UserName;
           var rolesAsync = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
           authenticationModel.Roles = rolesAsync.ToList();
           return authenticationModel;
        }
        authenticationModel.IsAuthenticated = false;
        authenticationModel.Message = $"Incorrect password for user {requestModel.Email}";
        return authenticationModel;
    }

    public async Task<string> AddRoleAsync(AddRoleModel model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);
        if(user == null)
            return $"No account registered with {model.Email} email";
        if (await _userManager.CheckPasswordAsync(user, model.Password))
        {
            var roleExists = Enum.GetNames(typeof(Authorization.Roles)).Any(x => x.ToLower() == model.Role.ToLower());
            if (roleExists)
            {
                var role = Enum.GetValues(typeof(Authorization.Roles)).Cast<Authorization.Roles>().FirstOrDefault(x => x.Equals(model.Role));
                await  _userManager.AddToRoleAsync(user, role.ToString());
                return $"Role {role.ToString()} has been added to {model.Role.ToString()}";
            }
            return $"Role {model.Role.ToString()} does not exist";
        }
        return $"Incorrect credentials for user {model.Email}";
    }

    private async Task<JwtSecurityToken> CreateJwtToken(ApplicationUser user)
    {
        var userClaims = await _userManager.GetClaimsAsync(user);
        var roles = await _userManager.GetRolesAsync(user);
        var roleClaims = new List<Claim>();
        for (int i = 0; i < roles.Count; i++)
        {
            roleClaims.Add(new Claim("roles", roles[i]));
        }

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("uid", user.Id),
        }.Union(userClaims).Union(roleClaims);
        
        var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
        var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

        var jwtSecurityToken = new JwtSecurityToken(
            issuer: _jwt.Issuer,
            audience: _jwt.Audience,
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: credentials
        );
        return jwtSecurityToken;
    }
}