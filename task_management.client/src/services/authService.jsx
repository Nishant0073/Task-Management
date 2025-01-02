import axios from "axios";

const API_URL = 'http://localhost:5182/user';


export const registerUser = async (userData) => {
    try{
        const response  = await axios.post(`${API_URL}/register`,userData);
        return response.data;
    }
    catch{
        console.error("Registration Failed!",error);
        throw error;
    }
}


export const loginUser = async (loginData) => {
    try{
        const response = await axios.post(`${API_URL}/token`,loginData);
        console.log(response.data);
        return response.data;
    }
    catch{
        console.error("Login failed!",error);;
        throw error;
    }
}