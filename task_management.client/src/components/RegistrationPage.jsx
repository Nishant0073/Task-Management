import React, { useState } from "react";
import { Container, Form, FormGroup, Input, Button, Row, Col, InputGroup, InputGroupText } from 'reactstrap';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaEdit, FaUserCircle } from "react-icons/fa";
import { registerUser, loginUser } from '../services/authService'
import { useNavigate } from "react-router-dom";
import { useToast } from "../Helper/ToastProvider.jsx";


const RegistrationPage = () => {

    const navigate = useNavigate();
    const notify = useToast();

    const [user, setUser] = useState({
        FirstName: '',
        LastName: '',
        UserName: '',
        Email: '',
        Password: '',
    });

    const [errors, setErrors] = useState({
        FirstName: '',
        LastName: '',
        UserName: '',
        Email: '',
        Password: '',
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const validate = () => {
        let isValid = true;
        let newErrors = {};

        if (!user.FirstName) {
            isValid = false;
            newErrors.FirstName = 'First Name is Required';
        }

        if (!user.LastName) {
            isValid = false;
            newErrors.LastName = 'Last Name is required';
        }
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!user.Email || !emailPattern.test(user.Email)) {
            isValid = false;
            newErrors.Email = 'Invalid email address';
        }

        if (!user.Password || user.Password.length < 6) {
            isValid = false;
            newErrors.Password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);
        return isValid;
    }


    const handleIsPasswordVisible = (event) => {
        setIsPasswordVisible(!isPasswordVisibile);
    }

    const [isPasswordVisibile, setIsPasswordVisible] = useState(false);

    const handleSumit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                var result = await registerUser(user);
                notify(result.message);
                if (result.errorCode == 0) {
                    navigate('/login');
                }
            } catch (error) {
                notify('Registration Failed!');
            }
        }
    }




    return (
        <div className="responsive-div">
            <br />
            <h2>Register new account ..</h2>
            <br />
            <br />
            <Form onSubmit={handleSumit}>
                <FormGroup>
                    <InputGroup>
                        <InputGroupText>
                            <FaUser />
                        </InputGroupText>
                        <Input placeholder="Shyam" name="FirstName" onChange={handleChange} type="text" value={user.FirstName} />
                    </InputGroup>
                    <span className="error-class">
                        {errors.FirstName}
                    </span>
                    <br />
                    <InputGroup>
                        <InputGroupText>
                            <FaEdit />
                        </InputGroupText>
                        <Input placeholder="Yadav" name="LastName" onChange={handleChange} type="text" value={user.LastName} />
                    </InputGroup>
                    <span className="error-class">
                        {errors.LastName}
                    </span>
                    <br />
                    <InputGroup>
                        <InputGroupText>
                            <FaUserCircle />
                        </InputGroupText>
                        <Input placeholder="username" name="UserName" onChange={handleChange} type="text" value={user.UserName} />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <InputGroupText>
                            <FaEnvelope />
                        </InputGroupText>
                        <Input placeholder="email" name="Email" onChange={handleChange} type="email" value={user.Email} />
                    </InputGroup>
                    <span className="error-class">
                        {errors.Email}
                    </span>
                    <br />
                    <InputGroup style={{ display: "flex", justifyContent: "space-between" }}>
                        <InputGroupText>
                            <FaLock />
                        </InputGroupText>
                        <Input placeholder="password" name="Password" onChange={handleChange} type={isPasswordVisibile ? "text" : "password"} value={user.Password} />
                        <InputGroupText>
                            <Button onClick={handleIsPasswordVisible} style={{
                                padding: 0,
                                margin: 0,
                                backgroundColor: "whitesmoke",
                                border: "none",
                                outline: "none",

                            }}>
                                {isPasswordVisibile ? <FaEye style={{ color: "black" }} /> : < FaEyeSlash style={{ color: "black" }} />}
                            </Button>
                        </InputGroupText>
                    </InputGroup>
                    <span className="error-class">
                        {errors.Password}
                    </span>
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
        </div>

    );

}

export default RegistrationPage;