using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Task_Management.Data;

namespace Task_Management.Repository;
/// <summary>
/// A generic class to perform CURD operations for the give model 
/// </summary>
/// <typeparam name="T"></typeparam>
public class Repository<T>:IRepository<T> 
    where T : class
{
    private readonly DbSet<T> _dbSet;
    private readonly DbContext context;

    public Repository(ApplicationDbContext context)
    {
        this.context = context;
        _dbSet = context.Set<T>();
    }
    
    //<summary>
    // function add options to the query
    //</summary>
    private IQueryable<T> ApplyQueryOptions(QueryOptions<T> options)
    {
        IQueryable<T> query = _dbSet;

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
    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    // Fetch task with given id
    public async Task<T> GetByIdAsync(int id, QueryOptions<T> options)
    {
        IQueryable<T> query = ApplyQueryOptions(options);
        var entityType = context.Model.FindEntityType(typeof(T));
        var primaryKey = entityType?.FindPrimaryKey()?.Properties.FirstOrDefault()?.Name;

        if (string.IsNullOrEmpty(primaryKey))
        {
            throw new InvalidOperationException($"Primary key not found for entity {typeof(T).Name}");
        }
        return await query.FirstOrDefaultAsync(e => EF.Property<int>(e,primaryKey) == id); 
    }
    
    // Add new task into database
    public async Task<T> AddAsync(T entity)
    {
        
        await _dbSet.AddAsync(entity);
        await context.SaveChangesAsync();
        return entity;
    }
    
    //Update a Task in the Database
    public async Task<T> UpdateAsync(T entity)
    {
        _dbSet.Entry(entity).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return entity;
    }
    
    //Delete a task with the given id
    public async Task DeleteAsync(int id)
    {
        T entity = await _dbSet.FindAsync(id);
        _dbSet.Remove(entity);
        await context.SaveChangesAsync();
    }
    
    // Find all task which has value for provided field.
    public async Task<IEnumerable<T>> GetAllByIdAsync<TKey>(TKey  id, string propertyName, QueryOptions<T> options)
    {
        IQueryable<T> query = ApplyQueryOptions(options);

        query = query.Where(e => EF.Property<TKey>(e,propertyName).Equals(id));

        return await query.ToListAsync();
    }
    
    
}