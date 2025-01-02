import React, { useState } from "react";
import { Container, Form, FormGroup, Input, Button, Row, Col, InputGroup, InputGroupText } from 'reactstrap';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaEdit, FaUserCircle } from "react-icons/fa";


const RegistrationPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisibile, setIsPasswordVisible] = useState(false);

    const handleIsPasswordVisible = (event) => {
        setIsPasswordVisible(!isPasswordVisibile);
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }



    return (
        <div className="responsive-div">
            <br />
                        <h2>Register new account ..</h2>
                        <br />
                        <br />
                        <Form>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>
                                        <FaUser />
                                    </InputGroupText>
                                    <Input placeholder="Shyam" onChange={handleFirstNameChange} type="text" />
                                </InputGroup>
                                <br />
                                <InputGroup>
                                    <InputGroupText>
                                        <FaEdit />
                                    </InputGroupText>
                                    <Input placeholder="Yadav" onChange={handleLastNameChange} type="text" />
                                </InputGroup>
                                <br />
                                <InputGroup>
                                    <InputGroupText>
                                        <FaUserCircle />
                                    </InputGroupText>
                                    <Input placeholder="username" onChange={handleUsernameChange} type="text" />
                                </InputGroup>
                                <br />
                                <InputGroup>
                                    <InputGroupText>
                                        <FaEnvelope />
                                    </InputGroupText>
                                    <Input placeholder="email" onChange={handleEmailChange} type="email" />
                                </InputGroup>
                                <br />
                                <InputGroup style={{ display: "flex", justifyContent: "space-between" }}>
                                    <InputGroupText>
                                        <FaLock />
                                    </InputGroupText>
                                    <Input placeholder="password" onChange={handlePasswordChange} type={isPasswordVisibile ? "text" : "password"} />
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
                            <Button color="primary">Submit</Button>
                        </Form>
                    </div>
            
    );

}

export default RegistrationPage;