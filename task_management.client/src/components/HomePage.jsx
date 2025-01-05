import React, { useState , useEffect} from "react";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { GetTasks } from "../services/taskService";
import { useToast } from "../Helper/ToastProvider.jsx";
import { useAuth } from "../Helper/AuthProvider.jsx";

const HomePage = () => {
    const navigate = useNavigate();
    const [taskList,setTaskList] = useState([]);
  const { logout } = useAuth();
    const notify = useToast();

    const handleEditTask = (task) => {
        navigate('/edittask',{state: {task}})
    }


    const taskStyle = (task) => {
        return (Date(task.dueDate) < Date.now && !task.isComplete) ? { color: "red" } : task.isComplete ? { color: "green" } : { color: "" };
    }
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const result = await GetTasks();
                if (result.status !== 200) { // Check for HTTP status code
                    notify("Failed to fetch tasks");
                }
                else if(result.status === 401){
                   await logout();
                    navigate("/login");
                }
                 else {
                    setTaskList(result.data);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
                notify("An error occurred while fetching tasks");
            }
        };

        fetchTasks(); // Call the async function
    }, []); 

    return (
        <div className="responsive-home-div">
            <h1 style={{ textAlign: "center", padding: "30px" }}>Tasks List</h1>
            <ListGroup flush>
                {
                    taskList.map(task => {
                        return <ListGroupItem key={task.id}
                            tag="a"
                            onClick={(e) => {
                                e.preventDefault();
                                handleEditTask(task);
                            }}
                        >
                            <ListGroupItemHeading style={taskStyle(task)}>{task.title}</ListGroupItemHeading>
                            <ListGroupItemText style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>{task.description}</span>
                                <span style={taskStyle(task)}>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: "2-digit", day: '2-digit' }).format(new Date(task.dueDate))}</span>
                            </ListGroupItemText>
                        </ListGroupItem>
                    })
                }
            </ListGroup>
        </div>);

    
}


export default HomePage;