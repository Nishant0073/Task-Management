import React, { useState } from "react";
import { Form, FormGroup, Label, Input, FormText, Button } from "reactstrap";

import { useLocation, useNavigate } from 'react-router-dom';

const EditTaskPage = () => {

    const location = useLocation();
    const { task } = location.state || {};
    const [taskStatus, setTaskStatus] = useState(true);
    const navigate = useNavigate();

    const handleUpdateTask = (event) => {
        navigate('/');
    }


    return (
        <div className="responsive-home-div">
            <h1 style={{ textAlign: "center", padding: "30px" }}>Task {task.title}</h1>
            <Form>
                <FormGroup>
                    <Label for="title">
                        Title
                    </Label>
                    <Input
                        id="title"
                        name="title"
                        placeholder="Complete API testing of ProjectX"
                        type="text"
                        value={task.title}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="description">
                        Description
                    </Label>
                    <Input
                        id="description"
                        placeholder="Test all endpoints of the ProjectX.With all position and negetive"
                        name="text"
                        type="textarea"
                        value={task.description}
                    />
                </FormGroup>


                <FormGroup>
                    <Label for="duedate">
                        Due Date
                    </Label>
                    <Input
                        id="duedate"
                        name="date"
                        placeholder="12/12/2024"
                        type="date"
                        value={task.dueDate ? task.dueDate.split('T')[0] : ''}
                    />
                </FormGroup>


                <FormGroup>
                    <Label for="examplePassword">
                        Task Status
                    </Label>
                    <FormGroup switch>
                        <Input
                            type="switch"
                            checked={taskStatus}
                            onClick={() => {
                                setTaskStatus(!taskStatus);
                            }}
                        />
                        <Label check>{taskStatus ? "Task Completed" : "Task Pending"}</Label>
                    </FormGroup>
                </FormGroup>

                <FormGroup>
                    <Label for="examplePassword">
                        Task Priority
                    </Label>

                    <Input
                        //bsSize="sm"
                        className="mb-3"
                        type="select"
                    >
                        <option>
                            option 1
                        </option>
                        <option>
                            option 2
                        </option>
                        <option>
                            option 3
                        </option>
                    </Input>
                </FormGroup>

                <div style={{ textAlign: 'center' }}>
                    <Button color="primary" onClick={handleUpdateTask} >Update Task</Button>
                </div>
            </Form>

        </div>
    );
}

export default EditTaskPage;