import React, { useState } from "react";
import { Container, Form, FormGroup, Input, Button, Row, Col, InputGroup, InputGroupText } from 'reactstrap';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaEdit, FaUserCircle } from "react-icons/fa";
import { registerUser, loginUser } from '../services/authService'
import { use } from "react";


const RegistrationPage = () => {

    const [user, setUser] = useState({
        FirstName: '',
        LastName: '',
        UserName: '',
        Email: '',
        Password: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }


    const handleIsPasswordVisible = (event) => {
        setIsPasswordVisible(!isPasswordVisibile);
    }

    const [isPasswordVisibile, setIsPasswordVisible] = useState(false);

    const handleSumit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(user);
        } catch (error) {
            alert('Registration failed!');
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
                    <br />
                    <InputGroup>
                        <InputGroupText>
                            <FaEdit />
                        </InputGroupText>
                        <Input placeholder="Yadav" name="LastName" onChange={handleChange} type="text" value={user.LastName} />
                    </InputGroup>
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
                    <br />
                    <InputGroup style={{ display: "flex", justifyContent: "space-between" }}>
                        <InputGroupText>
                            <FaLock />
                        </InputGroupText>
                        <Input placeholder="password" name="Password" onChange={handleChange} type={isPasswordVisibile ? "text" : "password"} valid={user.Password} />
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
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
        </div>

    );

}

export default RegistrationPage;