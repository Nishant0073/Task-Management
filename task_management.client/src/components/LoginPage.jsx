import React, { useState } from "react";
import { Container, Form, FormGroup, Input, Button, Row, Col, InputGroup, InputGroupText } from 'reactstrap';
import { FaEye, FaEyeSlash,FaLock, FaEnvelope } from "react-icons/fa";
import { loginUser } from "../services/authService";



const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        'Email': '',
        'Password': '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log({name,value});
        setCredentials((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const tokenData  = await loginUser(credentials);
            localStorage.setItem('jwt_token', tokenData);
            alert("Login successful");
        }catch(error){
            alert("Login failed");
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
                            <FaEnvelope/>
                        </InputGroupText>
                        <Input placeholder="email" type="email" name="Email" onChange={handleChange} value={credentials.Email}/>
                    </InputGroup>
                    <br />
                    <InputGroup style={{ display: "flex", justifyContent: "space-between" }}>
                        <InputGroupText>
                            <FaLock/>
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
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
        </div>

    );
}

export default LoginPage;