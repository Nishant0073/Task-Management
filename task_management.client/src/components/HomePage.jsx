import React from "react";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
import * as Data from '../sampleData'

const HomePage = () => {
    const taskStyle = (task) => {
        return (Date(task.dueDate) < Date.now && !task.isComplete) ? { color: "red" } : task.isComplete ? { color: "green" } : { color: "" };

    }
    return (
        <div className="responsive-div">
            <h1 style={{ textAlign: "center" }}>Tasks List</h1>
            <ListGroup flush>
                {
                    Data.taskList.map(task => {
                        return <ListGroupItem
                            href="#"
                            tag="a"
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