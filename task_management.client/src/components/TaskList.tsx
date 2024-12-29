import React from 'react'
import TaskItem from './TaskItem' ;
import { Task } from '../types/type.d';


interface TaskListProps {
    tasks: Task[];
    toggleTaskCompletion: (id : number) => void;
    deleteTask: (id: number) => void;
}


const TaskList: React.FC<TaskListProps> = ({
    tasks,
    toggleTaskCompletion,
    deleteTask,
}) => {
    return(
        <ul className='list-group'>
            {tasks.map((task) => (
                <TaskItem
                key={task.id}
                task={task}
                toggelTaskCompletion={toggleTaskCompletion}
                deleteTask={deleteTask}
                />
            ))}
        </ul>
    )
}

export default TaskList;