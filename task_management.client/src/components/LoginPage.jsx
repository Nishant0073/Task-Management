import React, { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button, Row, Col, InputGroup, InputGroupText } from 'reactstrap';
import { FaEye, FaEyeSlash } from "react-icons/fa";



const LoginPage = () => {

    const [password, setPassword] = useState('');
    const [isPasswordVisibile, setIsPasswordVisible] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleIsPasswordVisible = (event) => {
        setIsPasswordVisible(!isPasswordVisibile);
    }

    return (
        <Container style={{ height: '100vh' }} className="d-flex align-items-center justify-content-center">
            <Row className="w-100">
                <Col className="d-flex justify-content-center align-items-center">
                    <div className="login_responsive-div" style={{ textAlign: "center" }}>
                        <h2>Login to your account..</h2>
                        <br />
                        <br />
                        <Form>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>
                                        @
                                    </InputGroupText>
                                    <Input placeholder="username" />
                                </InputGroup>
                                <br />
                                <InputGroup style={{ display: "flex", justifyContent: "space-between" }}>
                                    <InputGroupText>
                                        @
                                    </InputGroupText>
                                    <Input placeholder="password" />
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
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;