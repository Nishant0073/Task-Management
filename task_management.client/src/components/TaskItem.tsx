import React from "react";
import { Task } from "../types/type.d";


interface TaskItemProps {
    task: Task,
    toggelTaskCompletion: (id: number) => void;
    deleteTask: (id: number) => void;
}


const TaskItem: React.FC<TaskItemProps> = ({
    task,
    toggelTaskCompletion,
    deleteTask,
}) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span style={{ textDecoration: task.isCompleted ? 'line-throght' : 'none', cursor: 'pointer' }} onClick={() => toggelTaskCompletion(task.id)}>
            </span>
            <button className="btn btn-danger btn-sm" onClick={()=> deleteTask(task.id)}>
            </button>
        </li>

    );
}


export default TaskItem;