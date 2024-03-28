import React, { useEffect, useState } from "react";
import { Badge, Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axiosInstance from "../axios";
import Loading from "../components/Loading";
import "./OrdersPage.css";

function OrdersPage() {
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get(`/users/${user._id}/orders`).then((responseData) => {
            setLoading(false);
            setOrders(responseData.data);
        }).catch((error) => {
            setLoading(false);
            console.log(error);
        });
    }, []);

    if (loading) {
        return <Loading />;
    }

     if (orders.length === 0) {
        return <h1 className="text-center pt-3">No orders yet</h1>;
    }
    return (
        <Container>
            <h1 className="text-center">Your orders</h1>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>
                                <Badge bg={`${order.status == "processing" ? "warning" : "success"}`} text="white">
                                    {order.status}
                                </Badge>
                            </td>
                            <td>{order.date}</td>

                            <td>Ksh {order.total}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default OrdersPage;
