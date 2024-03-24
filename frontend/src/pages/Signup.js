import React from 'react'
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Signup() {
    function handleSubmit () {

    }
    return (
        <Container>
            <Row>
                <Col md={6} className='signup_form--container'>
                    <Form style={{width: "100%"}} onSubmit={handleSubmit}>
                        <h1>Sign Up to your account</h1>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder='Enter email' value='' required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder='Enter password' value='' required/>
                        </Form.Group>
                        <Form.Group>
                            <Button type='submit'>Login</Button>
                        </Form.Group>
                        <p>
                            Already have an account?<Link to='/login'>Login</Link>
                        </p>
                    </Form>
                </Col>
                <Col md={6}></Col>
            </Row>
        </Container>
    )
}

export default Signup;
