using System.Linq.Expressions;
namespace Task_Management.Repository;
using Task = Task_Management.Models.Task;

public class QueryOptions<Task> 
{
    public Expression<Func<Task, object>> OrderBy { get; set; } = null!;
    public Expression<Func<Task,bool>> Where { get; set; } = null!;
    private string[] includes = Array.Empty<string>();  
    public string Includes
    {
        set => includes = value.Replace(" ","").Split(',');
    }
    public string[] GetIncludes() => includes;  
    public bool HasWhere => Where != null;
    public bool HasOrderBy => OrderBy != null; 
}