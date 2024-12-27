namespace Task_Management.Repository;
using Task = Task_Management.Models.Task;

public interface IRepository
{
    Task<IEnumerable<Models.Task>> GetAllAsync();
    Task<Task> GetByIdAsync(int id,QueryOptions<Task> options);
    Task<Task> AddAsync(Task entity);
    Task<Task> UpdateAsync(Task entity);
    Task<String> DeleteAsync(int id);

}