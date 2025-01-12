import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UpdateTask, DeleteTask } from '../services/taskService';
import { useToast } from "../Helper/ToastProvider.jsx";

const EditTaskPage = () => {
    const location = useLocation();
    const { task } = location.state || {};
    const notify = useToast();
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        dueDate: '',
        taskStatus: true,
        taskPriority: ''
    });

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        dueDate: '',
        taskStatus: true,
        taskPriority: ''
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


        if (!taskData.taskPriority) {
            isValid = false;
            newErrors.taskPriority = 'Task Priority is Required';
        }
        setErrors(newErrors);
        return isValid;
    }
    const [deleteTask, setDeleteTask] = useState(false);

    const navigate = useNavigate();

    // Initialize task data if task is passed
    useEffect(() => {
        if (task) {
            setTaskData({
                id: task.id || -1,
                title: task.title || '',
                description: task.description || '',
                dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
                taskStatus: task.isComplete || false,
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

    const handleUpdateTask = async (event) => {
        event.preventDefault();
        if (isValid()) {
            try {
                var response = await UpdateTask(taskData);
                if (response.status == 200) {
                    notify("Task Updated!");
                    navigate('/');
                }
                else {
                    notify("Failed to update task!");
                }
            } catch (error) {
                console.log(error);
                notify("Failed to update task!");
                navigate("/login")
            }
        }
    }
    const handleDelete = async () => {
        try {
            var response = await DeleteTask(taskData.id);
            if (response.status == 200) {
                notify(`${task.title} Task Deleted!`);
                navigate("/");
            }
            else if(response.status==401){
                navigate("/login");
            }
            else {
                notify("Failed to delete task!");
            }
            setDeleteTask(false);
        } catch (error) {
            console.log(error);
        }
    }
    const handlConfirmDelete = () => {
        setDeleteTask(true);
    }
    const handleCancel = () => {
        setDeleteTask(false);
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
                    <Label for="taskStatus">Task Status</Label>
                    <FormGroup switch>
                        <Input
                            type="switch"
                            checked={taskData.taskStatus}
                            onChange={handleStatusChange}
                        />
                        <Label check>{taskData.taskStatus ? "Task Completed" : "Task Pending"}</Label>
                    </FormGroup>
                    <span className='error-class'>{errors.taskStatus}</span>
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
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Input>
                    <span className='error-class'>{errors.taskPriority}</span>
                </FormGroup>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <Button type="button" className="btn btn-danger" onClick={handlConfirmDelete}>Delete Task</Button>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <Button type="submit">Update Task</Button>
                    </div>
                </div>

                <Modal isOpen={deleteTask} toggle={handlConfirmDelete}>

                    <ModalHeader toggle={handlConfirmDelete}>Confirmation</ModalHeader>

                    <ModalBody>

                        Are you sure you want to proceed?

                    </ModalBody>

                    <ModalFooter>

                        <Button color="primary" onClick={handleDelete}>

                            Yes

                        </Button>

                        <Button color="secondary" onClick={handleCancel}>

                            No

                        </Button>

                    </ModalFooter>

                </Modal>
            </Form>
        </div>
    );
}

export default EditTaskPage;
