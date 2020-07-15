import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrder = (props) => {
	const cartSelector = useSelector((state) => state.cart);
	const { cartItems, shipping, payment } = cartSelector;

	const itemsPrice = cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);
	const shippingPrice = itemsPrice > 100 ? 0 : 10;
	const taxPrice = 0.2 * itemsPrice;
	const totalPrice = itemsPrice + taxPrice + shippingPrice;

	const placeOrderHandler = () => {};

	useEffect(() => {}, []);

	const checkoutHandler = () => {
		props.history.push('/signin/?redirect=/shipping');
	};

	if (!shipping) {
		props.history.push('/shipping');
	} else if (!payment) {
		props.history.push('/payment');
	}

	return (
		<React.Fragment>
			<CheckoutSteps step1={true} step2={true} step3={true} step4={true} />
			<div className='placeorder'>
				<div className='placeorder-info'>
					<div>
						<h3>Shipping</h3>
						<div>
							{shipping.address}, {shipping.city}, {shipping.country},{' '}
							{shipping.postCode}
						</div>
					</div>
					<div>
						<h3>Payment</h3>
						<div>Payment Method: {payment.paymentMethod}</div>
					</div>
					<div>
						<ul className='cart-list-container'>
							<li>
								<h3>Shopping Cart</h3>
								<div>Price</div>
							</li>
							{cartItems.length > 0 ? (
								<Fragment>
									{cartItems.map((cartItem) => (
										<li key={cartItem._id}>
											<div className='cart-image'>
												<img src={cartItem.image} alt={cartItem.name} />
											</div>
											<div className='cart-name'>
												<Link to={'/product/' + cartItem._id}>
													{cartItem.name}
												</Link>
											</div>
											<div>Qty: {cartItem.quantity}</div>
											<div className='cart-price'>{cartItem.price}</div>
										</li>
									))}
								</Fragment>
							) : (
								<div>No items in cart</div>
							)}
						</ul>
					</div>
				</div>
				<div className='placeorder-actions'>
					<ul>
						<li>
							<button
								className='button primary full-width'
								onClick={placeOrderHandler}
							>
								Place Order
							</button>
						</li>
						<li>
							<h3>Order Summary</h3>
						</li>
						<li>
							<div>Items</div>
							<div>£{itemsPrice}</div>
						</li>
						<li>
							<div>Shipping</div>
							<div>£{shippingPrice}</div>
						</li>
						<li>
							<div>Tax</div>
							<div>£{taxPrice}</div>
						</li>
						<li>
							<div>Order Total</div>
							<div>£{totalPrice}</div>
						</li>
					</ul>
				</div>
			</div>
		</React.Fragment>
	);
};

export default PlaceOrder;
