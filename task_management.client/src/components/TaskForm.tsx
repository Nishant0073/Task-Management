import React, {useState} from "react";


interface TaskFormProps {
    addTask: (task: string) => void;
}


const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
    const [task, setTask] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(task.trim()){
            addTask(task);
            setTask('');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <div className="input-group">
                <input
                type="text"
                className="form-control"
                placeholder="Addd a new task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                />

                <button type="submit" className="btn btn-primary">
                    Add Task
                </button>
            </div>
        </form>
    )
}
export default TaskForm;