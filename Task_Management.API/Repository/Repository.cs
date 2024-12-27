using System.Security.Claims;
using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Task_Management.Data;
using Task_Management.Models;
using Task = Task_Management.Models.Task;

namespace Task_Management.Repository;
/// <summary>
/// A generic class to perform CURD operations for the give model 
/// </summary>
/// <typeparam name="T"></typeparam>
public class Repository : IRepository
{
    private readonly DbSet<Task> _dbSet;
    private readonly  ApplicationDbContext _context;
    private readonly ClaimsPrincipal _applicationUser;

    public Repository(ApplicationDbContext context,ClaimsPrincipal user)
    {
        this._context = context;
        _dbSet = context.Set<Task>();
        _applicationUser = user;
    }
    
    //<summary>
    // function add options to the query
    //</summary>
    private IQueryable<Task> ApplyQueryOptions(QueryOptions<Task> options)
    {
        IQueryable<Task> query = _dbSet;

        if (options.HasWhere)
        {
            query = query.Where(options.Where);
        }

        if (options.HasOrderBy)
        {
            query = query.OrderBy(options.OrderBy);
        }

        foreach (string include in options.GetIncludes())
        {
            query = query.Include(include);
        }

        return query;
    }
    
    //Fetch all tasks from the database
    public async Task<IEnumerable<Task>> GetAllAsync()
    {
        if (_applicationUser.IsInRole("Admin"))
            return _dbSet.ToList();

        string userId = _applicationUser.FindFirst("uid").Value;

        return _dbSet.Where(e => EF.Property<string>(e, "UserId") == userId).ToList();    }

    public async Task<Task> GetByIdAsync(int id, QueryOptions<Task> options)
    {
        IQueryable<Task> query = ApplyQueryOptions(options);
        
        Task? task = await _dbSet.Where(e => e.Id == id).FirstOrDefaultAsync();
        if(task == null)
            return null;
        return task.UserId == _applicationUser.FindFirst("uid").Value ? task : null;
    }
    
    // Add new task into database
    public async Task<Task> AddAsync(Task entity)
    {
        await _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }
    
    //Update a Task in the Database
    public async Task<Task?> UpdateAsync(Task entity)
    {
        Task? existingTask = await _dbSet.FindAsync(entity.Id);
        if (existingTask == null)
            return null;

        string userId = _applicationUser.FindFirst("uid").Value;
        if (existingTask.UserId != userId)
            return null;

        // Detach the existing tracked instance
        _context.Entry(existingTask).State = EntityState.Detached;
        
        entity.UserId = userId;
        // Attach the new entity and mark it as modified
        _context.Entry(entity).State = EntityState.Modified;

        await _context.SaveChangesAsync();
        return entity;
    }

    
    //Delete a task with the given id
    public async Task<String> DeleteAsync(int id)
    {
        Task entity = await _dbSet.FindAsync(id);
        if(entity==null)
            return $"Task {id} not found";
        string usedId = entity.UserId;
            
        if(usedId !=_applicationUser.FindFirst("uid").Value)
            return $"You don't have access to  delete {id} task";
        
        _dbSet.Remove(entity);
        await _context.SaveChangesAsync();
        return $"Entity with id {id} successfully deleted";
    }
    
    // Find all task which has value for provided field.
    public async Task<IEnumerable<Task>> GetAllByIdAsync<TKey>(TKey  id, string propertyName, QueryOptions<Task> options)
    {
        IQueryable<Task> query = ApplyQueryOptions(options);

        query = query.Where(e => EF.Property<TKey>(e,propertyName).Equals(id) && EF.Property<string>(e,"UserId") == _applicationUser.FindFirst("uid").ToString()); 

        return await query.ToListAsync();
    }
    
    
}