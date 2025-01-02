import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const EditTaskPage = () => {
    const location = useLocation();
    const { task } = location.state || {};
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        dueDate: '',
        taskStatus: true,
        taskPriority: ''
    });

    const navigate = useNavigate();

    // Initialize task data if task is passed
    useEffect(() => {
        if (task) {
            setTaskData({
                title: task.title || '',
                description: task.description || '',
                dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
                taskStatus: task.status || true,
                taskPriority: task.priority || ''
            });
        }
    }, [task]);

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
            taskStatus: !prevState.taskStatus
        }));
    }

    const handleUpdateTask = (event) => {
        event.preventDefault();
        console.log('Updated Task Data:', taskData);

        navigate('/');
    }

    return (
        <div className="responsive-home-div">
            <h1 style={{ textAlign: "center", padding: "30px" }}>Edit Task</h1>
            <Form onSubmit={handleUpdateTask}>
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
                </FormGroup>

                <FormGroup>
                    <Label for="taskStatus">Task Status</Label>
                    <FormGroup switch>
                        <Input
                            type="switch"
                            checked={taskData.taskStatus}
                            onChange={handleStatusChange}
                        />
                        <Label check>{taskData.taskStatus ? "Task Completed" : "Task Pending"}</Label>
                    </FormGroup>
                </FormGroup>

                <FormGroup>
                    <Label for="taskPriority">Task Priority</Label>
                    <Input
                        id="taskPriority"
                        name="taskPriority"
                        type="select"
                        onChange={handleChange}
                        value={taskData.taskPriority}
                    >
                        <option value="">Select Priority</option>
                        <option value="Hight">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Input>
                </FormGroup>

                <div style={{ textAlign: 'center' }}>
                    <Button type="submit">Update Task</Button>
                </div>
            </Form>
        </div>
    );
}

export default EditTaskPage;
