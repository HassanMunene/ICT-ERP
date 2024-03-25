import { useState } from 'react';
import React from 'react'
import {Button, Col, Container, Form, Row, Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Signup.css';
import { useSignupMutation  } from '../services/appApi';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [signup, {error, isLoading, isError}] = useSignupMutation();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        signup({name, email, password});
    };
    return (
        <Container>
            <Row>
                <Col md={6} className='signup__form--container'>
                    <Form style={{width: "100%"}} onSubmit={handleSubmit}>
                        <h1>Create an account</h1>
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder='Enter name'
                                value={name}
                                required
                                onChange={handleNameChange}/>
                        </Form.Group>

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
                            <Button type='submit' disabled={isLoading}>
                                {isLoading ? "CREATING...": "CREATE ACCOUNT"}
                            </Button>
                        </Form.Group>
                        <p>
                            Already have an account? <Link to='/login'>Login</Link>
                        </p>
                    </Form>
                </Col>
                <Col md={6} className='signup__image--container'></Col>
            </Row>
        </Container>
    )
}

export default Signup;
