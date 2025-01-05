import React, { useState } from "react";
import { Container, Form, FormGroup, Input, Button, Row, Col, InputGroup, InputGroupText } from 'reactstrap';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import { loginUser } from "../services/authService";
import { useToast } from "../Helper/ToastProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Helper/AuthProvider";




const LoginPage = () => {
    const notify = useToast();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({
        'Email': '',
        'Password': '',
    });

    const [errors, setErrors] = useState({
        Email: '',
        Password: '',
    });

    const validate = () => {
        let isValid = true;
        let newErrors = {};

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!credentials.Email || !emailPattern.test(credentials.Email)) {
            isValid = false;
            newErrors.Email = 'Invalid email address';
        }

        if (!credentials.Password || credentials.Password.length < 6) {
            isValid = false;
            newErrors.Password = 'Password must be at least 6 characters long';
        }
        setErrors(newErrors);
        return isValid;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const tokenData = await loginUser(credentials);
                console.log(tokenData.token)
                await localStorage.setItem('jwt_token', tokenData.token);
                if (tokenData.isAuthenticated==true) {
                    await login(tokenData.token)
                    navigate('/');
                }
                else {
                    notify("Invalid Username or Password");
                }
            } catch (error) {
                notify("Invalid Username or Password");
            }
        }
    }


    const [isPasswordVisibile, setIsPasswordVisible] = useState(false);

    const handleIsPasswordVisible = (event) => {
        setIsPasswordVisible(!isPasswordVisibile);
    }

    return (
        <div className="responsive-div">
            <br />
            <h2>Login to your account..</h2>
            <br />
            <br />
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <InputGroup>
                        <InputGroupText>
                            <FaEnvelope />
                        </InputGroupText>
                        <Input placeholder="email" type="email" name="Email" onChange={handleChange} value={credentials.Email} />
                    </InputGroup>
                    <span className="error-class">
                        {errors.Email}
                    </span>
                    <br />
                    <InputGroup style={{ display: "flex", justifyContent: "space-between" }}>
                        <InputGroupText>
                            <FaLock />
                        </InputGroupText>
                        <Input placeholder="password" name="Password" onChange={handleChange} type={isPasswordVisibile ? "text" : "password"} value={credentials.Password} />
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

export default LoginPage;