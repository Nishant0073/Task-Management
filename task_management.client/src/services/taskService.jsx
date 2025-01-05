import axios from "axios";

const API_URL = "http://localhost:5182/Task";

export const GetTasks = async () => {
    const TOKEN = localStorage.getItem('jwt_token');
    try {
        const response = await axios.get(`${API_URL}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        });
        return response;
    }
    catch (error) {
        console.log("Failed to fetch tasks!", error);
        throw error;
    }
}

export const UpdateTask = async (task) => {
    const TOKEN = localStorage.getItem('jwt_token');
    try {
        var ntask = {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "dueDate": task.dueDate,
            "isComplete": task.taskStatus,
            "priority": task.taskPriority
        };
        const response = await axios.put(`${API_URL}`,ntask, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            },
        })
        return response;
    } catch (error) {
        console.log("Failed to update task!", error);
    }
}


export const AddTask = async (task) => {
    const TOKEN = localStorage.getItem('jwt_token');

    try{
        const response = await axios.post(`${API_URL}`,task,{
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        })
        return response;
    }
    catch(error){
        console.log("Failed to add task!", error)
        return null;
    }
}