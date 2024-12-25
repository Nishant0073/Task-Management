namespace Task_Management.Constants;

public class Authorization
{
    public enum Roles
    {
        Admin,
        User
    }
    public const string default_username = "user";
    public const string default_email = "user@taskmanagement.com";
    public const string default_password = "password";
    public const Roles  default_role = Roles. User;
}