import React from 'react';
import {useState, useRef} from 'react';
import axiosInstance from '../axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { logout, resetNotifications } from "../features/userSlice";
import { FaShoppingCart } from "react-icons/fa";
import './Navigation.css';


function Navigation() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const bellRef = useRef(null);
    const notificationRef = useRef(null);
    const [bellPos, setBellPos] = useState({});

    function handleLogout () {
        dispatch(logout());
    }
    const unreadNotifications = user?.notifications.reduce((accumulator, item) => {
        if (item.status === "unread") {
            return accumulator += 1
        }
        return accumulator;
    }, 0)

    function handleToggleNotifications() {
        const position = bellRef.current.getBoundingClientRect();
        setBellPos(position);
        notificationRef.current.style.display = notificationRef.current.style.display === "block" ? "none" : "block";
        dispatch(resetNotifications());
        if (unreadNotifications > 0) {
            axiosInstance.post(`/users/${user._id}/updateNotifications`)
            .then((responseData) => {
                console.log(responseData);
            })
            .catch((error) => {
                console.log('Error handling Toggle notifcation', error);
            });
        }
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>KcaMarket</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* if not user is available yet*/}
                        {!user && (
                            <LinkContainer to='/login'>
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )}

                        {user && !user.isAdmin && (
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <FaShoppingCart size={20}/>
                                    {user?.cart.count > 0 && (
                                        <span className="badge badge-warning" id="cartcount">
                                            {user.cart.count}
                                        </span>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                        )}


                        {/* if user is now available or rather logged In*/}

                        {user && (
                            <>
                                <Nav.Link style={{position: "relative"}} onClick={handleToggleNotifications}>
                                    <i className="fas fa-bell" ref={bellRef} data-count={unreadNotifications || null}></i>
                                </Nav.Link>
                                <NavDropdown title={`${user.name}`} id="basic-nav-dropdown">
                                    {user.isAdmin && (
                                        <>
                                            <LinkContainer to="/admin">
                                                <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/new-product">
                                                <NavDropdown.Item>Create Product</NavDropdown.Item>
                                            </LinkContainer>
                                        </>
                                    )}
                                    {!user.isAdmin && (
                                        <>
                                            <LinkContainer to="/cart">
                                                <NavDropdown.Item>Cart</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/orders">
                                                <NavDropdown.Item>My orders</NavDropdown.Item>
                                            </LinkContainer>
                                        </>
                                    )}
                                    <NavDropdown.Divider />
                                    <Button variant="danger" onClick={handleLogout} className="logout-btn">
                                        Logout
                                    </Button>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>

            {/*This is the notifications section*/}
            <div className="notifications-container" ref={notificationRef} style={{ position: "absolute", top: bellPos.top + 30, left: bellPos.left, display: "none" }}>
                {user?.notifications.length > 0 ? (
                    user?.notifications.map((notification) => (
                        <p className={`notification-${notification.status}`} key={notification._id}>
                            {notification.message}
                            <br />
                            <span>{notification.time.split("T")[0] + " " + notification.time.split("T")[1]}</span>
                        </p>
                    ))
                ) : (
                    <p>No notifcations yet</p>
                )}
            </div>
        </Navbar>
    )
}

export default Navigation;
