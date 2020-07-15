import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addToCart, removeFromCart } from '../actions/cart';

const Cart = (props) => {
	const productId = props.match.params.id;
	const quantity = props.location.search
		? props.location.search.split('=')[1]
		: 1;
	const dispatch = useDispatch();
	const cartSelector = useSelector((state) => state.cart);
	const { cartItems } = cartSelector;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, quantity));
		}
	}, []);

	const removeFromCartHandler = (productId) => {
		dispatch(removeFromCart(productId));
	};

	const checkoutHandler = () => {
		props.history.push('/signin/?redirect=/shipping');
	};

	return (
		<div className='cart'>
			<div className='cart-list'>
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
										<Link to={'/product/' + cartItem._id}>{cartItem.name}</Link>
									</div>
									<div>
										Qty:
										<select
											value={cartItem.quantity}
											onChange={(e) =>
												dispatch(addToCart(cartItem._id, e.target.value))
											}
										>
											{[...Array(cartItem.stock_count).keys()].map((value) => (
												<option key={value} value={value + 1}>
													{value + 1}
												</option>
											))}
										</select>
										<button
											className='button'
											type='button'
											onClick={() => removeFromCartHandler(cartItem._id)}
										>
											Delete
										</button>
									</div>
									<div className='cart-price'>{cartItem.price}</div>
								</li>
							))}
						</Fragment>
					) : (
						<div>No items in cart</div>
					)}
				</ul>
			</div>
			<div className='cart-actions'>
				<h3>
					Subtotal (
					{cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)}{' '}
					items): £
					{cartItems.reduce(
						(acc, cartItem) => acc + cartItem.price * cartItem.quantity,
						0
					)}
				</h3>
				<button
					onClick={checkoutHandler}
					className='button primary full-width'
					disabled={cartItems.length === 0}
				>
					Proceed to checkout
				</button>
			</div>
		</div>
	);
};

export default Cart;
