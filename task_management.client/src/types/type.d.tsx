/*public class Task
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public bool IsComplete { get; set; }
    public string Priority { get; set; }
    public int UserId { get; set; }
}*/

export interface Task{
    id: number,
    title : string,
    description: string,
    dueDate: Date,
    isCompleted : boolean,
    priority: string,
    userId : string,
}