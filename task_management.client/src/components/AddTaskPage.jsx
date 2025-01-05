import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { AddTask } from '../services/taskService';
import { useToast } from "../Helper/ToastProvider.jsx";

const AddTaskPage = () => {
  const location = useLocation();
    const { task } = location.state || {};
    const notify = useToast();
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        dueDate: '',
        isComplete: false,
        priority: ''
    });

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        dueDate: '',
        isComplete: false,
        priority: ''
    });

    const isValid = () => {
        let isValid = true;
        let newErrors = {};

        if (!taskData.title) {
            isValid = false;
            newErrors.title = 'Title is Required';
        }

        if (!taskData.description) {
            isValid = false;
            newErrors.description = 'Description is Required';
        }

        if (!taskData.dueDate) {
            isValid = false;
            newErrors.description = 'Due Date is Required';
        }


        if (!taskData.priority) {
            isValid = false;
            newErrors.priority = 'Task Priority is Required';
        }
        setErrors(newErrors);
        return isValid;
    }

    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleStatusChange = () => {
        setTaskData((prevState) => ({
            ...prevState,
            isComplete: !prevState.isComplete
        }));
    }

    const handleSubmitTask = async (event) => {
        event.preventDefault();
        if (isValid()) {
            try {
                var response = await AddTask(taskData);
                if (response.status == 201) {
                    notify("Task Added!");
                    navigate('/');
                }
                else {
                    console.log(response.status);
                    notify("Failed to add task!");
                }
            } catch (error) {
                console.log(error);
                notify("Failed to add task!");
            }
        }
    }

    return (
        <div className="responsive-home-div">
            <h1 style={{ textAlign: "center", padding: "30px" }}>Add New Task</h1>
            <Form onSubmit={handleSubmitTask}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                        id="title"
                        name="title"
                        placeholder="Complete API testing of ProjectX"
                        type="text"
                        onChange={handleChange}
                        value={taskData.title}
                    />
                    <span className='error-class'>{errors.title}</span>
                </FormGroup>

                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                        id="description"
                        name="description"
                        placeholder="Test all endpoints of the ProjectX"
                        type="textarea"
                        onChange={handleChange}
                        value={taskData.description}
                    />
                    <span className='error-class'>{errors.description}</span>
                </FormGroup>

                <FormGroup>
                    <Label for="duedate">Due Date</Label>
                    <Input
                        id="duedate"
                        name="dueDate"
                        placeholder="12/12/2024"
                        type="date"
                        onChange={handleChange}
                        value={taskData.dueDate}
                    />
                    <span className='error-class'>{errors.dueDate}</span>
                </FormGroup>

                <FormGroup>
                    <Label for="isComplete">Task Status</Label>
                    <FormGroup switch>
                        <Input
                            type="switch"
                            checked={taskData.isComplete}
                            onChange={handleStatusChange}
                        />
                        <Label check>{taskData.isComplete ? "Task Completed" : "Task Pending"}</Label>
                    </FormGroup>
                    <span className='error-class'>{errors.isComplete}</span>
                </FormGroup>

                <FormGroup>
                    <Label for="priority">Task Priority</Label>
                    <Input
                        id="priority"
                        name="priority"
                        type="select"
                        onChange={handleChange}
                        value={taskData.priority}
                    >
                        <option value="">Select Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Input>
                    <span className='error-class'>{errors.priority}</span>
                </FormGroup>

                <div style={{ textAlign: 'center' }}>
                    <Button type="submit">Add Task</Button>
                </div>
            </Form>
        </div>
    );
}

export default AddTaskPage;