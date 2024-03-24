import React, { useState } from 'react'
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("email:", email);
        console.log("password:", password);
    };
    return (
        <Container>
            <Row>
                <Col md={6} className='login__form--container'>
                    <Form style={{width: "100%"}} onSubmit={handleSubmit}>
                        <h1>Login to your account</h1>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder='Enter email' 
                                value={email} 
                                required 
                                onChange={handleEmailChange}/>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder='Enter password' 
                                value={password} 
                                required 
                                onChange={handlePasswordChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button type='submit'>Login</Button>
                        </Form.Group>
                        <p>
                            Dont have an account? <Link to='/signup'>Create account</Link>
                        </p>
                    </Form>
                </Col>
                <Col md={6} className='login__image--container'></Col>
            </Row>
        </Container>
    )
}

export default Login
