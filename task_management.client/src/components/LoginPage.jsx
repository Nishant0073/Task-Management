import React, { useState } from "react";
import { Container, Form, FormGroup, Input, Button, Row, Col, InputGroup, InputGroupText } from 'reactstrap';
import { FaEye, FaEyeSlash } from "react-icons/fa";



const LoginPage = () => {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [isPasswordVisibile, setIsPasswordVisible] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleIsPasswordVisible = (event) => {
        setIsPasswordVisible(!isPasswordVisibile);
    }

    return (
        <div className="responsive-div">
            <br />
                        <h2>Login to your account..</h2>
                        <br />
                        <br />
                        <Form>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>
                                        @
                                    </InputGroupText>
                                    <Input placeholder="username" onChange={handleUsernameChange} />
                                </InputGroup>
                                <br />
                                <InputGroup style={{ display: "flex", justifyContent: "space-between" }}>
                                    <InputGroupText>
                                        @
                                    </InputGroupText>
                                    <Input placeholder="password" onChange={handlePasswordChange} />
                                    <InputGroupText>
                                        <Button onClick={handleIsPasswordVisible} style={{
                                            padding: 0,
                                            margin: 0,
                                            backgroundColor: "whitesmoke",
                                            border: "none",
                                            outline: "none",

                                        }}>
                                            {isPasswordVisibile ? <FaEye  style={{color:"black"}}/> : < FaEyeSlash  style={{color:"black"}}/>}
                                        </Button>
                                    </InputGroupText>
                                </InputGroup>
                            </FormGroup>
                            <Button color="primary">Submit</Button>
                        </Form>
                    </div>
            
    );
}

export default LoginPage;