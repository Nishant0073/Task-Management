import React from "react";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
import * as Data from '../sampleData'
import EditTaskPage from "./EditTaskPage";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const handleEditTask = (task) => {
        //const task = { id: 1, title: 'Sample Task', description: 'Task Description' }; 
        navigate('/edittask',{state: {task}})
    }


    const taskStyle = (task) => {
        return (Date(task.dueDate) < Date.now && !task.isComplete) ? { color: "red" } : task.isComplete ? { color: "green" } : { color: "" };
    }

    return (
        <div className="responsive-home-div">
            <h1 style={{ textAlign: "center", padding: "30px" }}>Tasks List</h1>
            <ListGroup flush>
                {
                    Data.taskList.map(task => {
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