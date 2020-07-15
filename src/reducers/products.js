import {
	GET_PRODUCTS_REQUEST,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_FAIL,
} from '../types/products';

const initialState = {
	products: [],
	loading: false,
	errors: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_PRODUCTS_REQUEST:
			return {
				...state,
				loading: true,
				errors: [],
			};
		case GET_PRODUCTS_SUCCESS:
			return {
				...state,
				loading: false,
				products: action.payload,
				errors: [],
			};
		case GET_PRODUCTS_FAIL:
			return {
				...state,
				loading: false,
				errors: action.payload,
			};
		default:
			return state;
	}
};
