import React from 'react'
import {useState, useRef} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import { FaShoppingCart } from "react-icons/fa";
import './Navigation.css';


function Navigation() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    function handleLogout () {
        dispatch(logout());
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
                        

                        {/* if user is now available*/}

                        {user && (
                            <>
                                <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
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
        </Navbar>
    )
}

export default Navigation;
