import axios from "axios";

const API_URL = "http://localhost:5182/Task";
const TOKEN = localStorage.getItem('jwt_token');

export const GetTasks = async () => {
    //console.log(TOKEN);
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