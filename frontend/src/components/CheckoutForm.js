import {useState} from 'react';
import { Alert, Button, Col, Form} from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi"

function CheckoutForm() {
    const user = useSelector((state) => state.user);
    const [alertMessage, setAlertMessage] = useState("");
    const [county, setCounty] = useState("");
    const [constituency, setConstituency] = useState("");
    const [localArea, setLocalArea] = useState("");
    const navigate = useNavigate();
    const [createOrder, { isLoading, isError }] = useCreateOrderMutation();

    async function handlePay(event) {
        event.preventDefault();
        if (user.cart.count <= 0) {
            return;
        }
        const orderPayload = {
            'name': user.name,
            'amount': user.cart.total,
            'email': user.email,
            'county': county,
            'constituency': constituency,
            'localArea': localArea,
        }
        const headers = {
            'Content-Type': 'application/json',
        }
        await axios.post("http://localhost:8081/create-payment", orderPayload, {headers})
        .then((responseData) => {
            if (responseData.data === "success") {
                createOrder({ userId: user._id, cart: user.cart, county: county, constituency: constituency, localArea: localArea })
                .then((responseData) => {
                    if (!isLoading && !isError) {
                        setAlertMessage("Order Successfully Received and Recorded");
                        setTimeout(() => {
                            navigate("/orders");
                        }, 3000);
                    }
                })
                .catch((error) => {
                    console.log('error making order', error);
                });
            } else {
                console.log('not equal');
            }
        }).catch((error) => {
            console.log('error paying:', error);
        });
    }
    return (
        <Col className="cart-payment-container">
            <Form onSubmit={handlePay}>
                {alertMessage && <Alert>{alertMessage}</Alert>}
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" value={user.name} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Email" value={user.email} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>County</Form.Label>
                    <Form.Control type="text" placeholder="E.g Nairobi" value={county} onChange={(e) => setCounty(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Constituency</Form.Label>
                    <Form.Control type="text" placeholder="E.g Embakasi South" value={constituency} onChange={(e) => setConstituency(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Local Area name</Form.Label>
                    <Form.Control type="text" placeholder="E.g Imaara Daima, Mastermind" value={localArea} onChange={(e) => setLocalArea(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Button className="me-3" type='submit' >CASH ON DELIVERY</Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default CheckoutForm;