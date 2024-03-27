import React from 'react';
import {useSelector} from 'react-redux';
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import "./CartPage.css";

function CartPage() {
	const user = useSelector((state) => state.user);
	const products = useSelector((state) => state.products);
	//every user model has a cart field
	const userCartObject = user.cart;
	let cart = products.filter((product) => userCartObject[product._id] != null);

	return (
		<div>
			<Container style={{ minHeight: "95vh" }} className="cart-container">
				<Row>
					<h1 className="pt-2 h3">Shopping cart</h1>
					{cart.length == 0 ? (
                        <Alert variant="info">Shopping cart is empty. Add products to your cart</Alert>
                    ) : (
                    	<div>Payment here</div>
                    )}
				</Row>
			</Container>
		</div>
	)
}

export default CartPage;