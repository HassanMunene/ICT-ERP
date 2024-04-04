import React from 'react';
import {useSelector} from 'react-redux';
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation } from "../services/appApi";
import CheckoutForm from '../components/CheckoutForm';
import "./CartPage.css";

function CartPage() {
	const user = useSelector((state) => state.user);
	const products = useSelector((state) => state.products);
	//every user model has a cart field
	const userCartObject = user.cart;
	let cart = products.filter((product) => userCartObject[product._id] != null);
	const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
	const [decreaseCart] = useDecreaseCartProductMutation();
	const [increaseCart] = useIncreaseCartProductMutation();

	function handleDecrease(product) {
        const quantity = user.cart.count;
        if (quantity <= 0) return alert("Can't proceed");
        decreaseCart(product);
    }

	return (
		<div>
			<Container style={{ minHeight: "95vh" }} className="cart-container">
				<Row>
					<Col md={7}>
						<h1 className="pt-2 h3">Shopping cart</h1>
						{cart.length === 0 ? (
	                        <Alert variant="info">Shopping cart is empty. Add products to your cart</Alert>
	                    ) : (
	                    	<CheckoutForm/>
	                    )}
					</Col>
					{cart.length > 0 && (
						<Col md={5}>
							<>
								<Table responsive="sm" className="cart-table">
	                                <thead>
	                                    <tr>
	                                        <th>&nbsp;</th>
	                                        <th>Product</th>
	                                        <th>Price</th>
	                                        <th>Quantity</th>
	                                        <th>Subtotal</th>
	                                    </tr>
	                                </thead>
	                                <tbody>
	                                    {/* loop through cart products */}
	                                    {cart.map((item) => (
	                                        <tr key={item._id}>
	                                            <td>&nbsp;</td>
	                                            <td>
	                                                {!isLoading && <MdOutlineCancelPresentation style={{ marginRight: 10, cursor: "pointer" }} onClick={() => removeFromCart({ productId: item._id, price: item.price, userId: user._id })}/>}
	                                                <img src={item.pictures[0].url} alt="cart-ig" style={{ width: 100, height: 100, objectFit: "cover" }} />
	                                            </td>
	                                            <td>Ksh {item.price}</td>
	                                            <td>
	                                                <span className="quantity-indicator">
	                                                    <FaCircleMinus className="faMinus" style={{cursor: "pointer"}} onClick={() => handleDecrease({ productId: item._id, price: item.price, userId: user._id })}/>
	                                                    <span>{user.cart[item._id]}</span>
	                                                    <FaCirclePlus  className="faPlus" style={{cursor: "pointer"}} onClick={() => increaseCart({ productId: item._id, price: item.price, userId: user._id })}/>
	                                                </span>
	                                            </td>
	                                            <td>Ksh {item.price * user.cart[item._id]}</td>
	                                        </tr>
	                                    ))}
	                                </tbody>
	                            </Table>
	                            <div>
                                	<h3 className="h4 pt-4">Total: Ksh {user.cart.total}</h3>
                            	</div>
							</>
						</Col>
					)}
				</Row>
			</Container>
		</div>
	)
}

export default CartPage;
