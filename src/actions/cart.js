import axios from 'axios';
import cookie from 'js-cookie';

import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	SAVE_SHIPPING_FAIL,
	SAVE_SHIPPING_REQUEST,
	SAVE_SHIPPING_SUCCESS,
	SAVE_PAYMENT_REQUEST,
	SAVE_PAYMENT_SUCCESS,
	SAVE_PAYMENT_FAIL,
} from '../types/cart';

export const addToCart = (productId, quantity) => async (
	dispatch,
	getState
) => {
	try {
		const { data } = await axios.get(`/api/products/${productId}`);
		const cartItem = {
			_id: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			stock_count: data.stock_count,
			quantity: parseInt(quantity),
		};

		dispatch({ type: ADD_TO_CART, payload: cartItem });

		const {
			cart: { cartItems },
		} = getState();

		cookie.set('cartItems', JSON.stringify(cartItems));
	} catch (error) {}
};

export const removeFromCart = (productId) => (dispatch, getState) => {
	dispatch({ type: REMOVE_FROM_CART, payload: productId });

	const {
		cart: { cartItems },
	} = getState();

	cookie.set('cartItems', JSON.stringify(cartItems));
};

export const saveShipping = (address) => async (dispatch) => {
	try {
		dispatch({ type: SAVE_SHIPPING_REQUEST });
		dispatch({ type: SAVE_SHIPPING_SUCCESS, payload: address });
	} catch (error) {
		dispatch({ type: SAVE_SHIPPING_FAIL, payload: error.message });
	}
};

export const savePayment = (payment) => async (dispatch) => {
	try {
		dispatch({ type: SAVE_PAYMENT_REQUEST });
		dispatch({ type: SAVE_PAYMENT_SUCCESS, payload: payment });
	} catch (error) {
		dispatch({ type: SAVE_PAYMENT_FAIL, payload: error.message });
	}
};
