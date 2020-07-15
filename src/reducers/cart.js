import cookie from 'js-cookie';

import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	SAVE_SHIPPING_SUCCESS,
	SAVE_PAYMENT_SUCCESS,
} from '../types/cart';

const initialState = {
	cartItems: cookie.getJSON('cartItems') || [],
	shipping: null,
	payment: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			const cartItem = action.payload;
			const product = state.cartItems.find((item) => item._id === cartItem._id);
			let cartItems = [];

			if (product) {
				product.quantity = cartItem.quantity;
				cartItems = [
					...state.cartItems.map((item) =>
						item._id === product._id ? product : item
					),
				];
			} else {
				cartItems = [...state.cartItems, cartItem];
			}

			return {
				...state,
				cartItems,
			};
		case REMOVE_FROM_CART:
			return {
				...state,
				cartItems: state.cartItems.filter(
					(item) => item._id !== action.payload
				),
			};

		case SAVE_SHIPPING_SUCCESS:
			return {
				...state,
				shipping: action.payload,
			};
		case SAVE_PAYMENT_SUCCESS:
			return {
				...state,
				payment: action.payload,
			};
		default:
			return state;
	}
};
