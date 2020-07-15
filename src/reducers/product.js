import {
	GET_PRODUCT_REQUEST,
	GET_PRODUCT_SUCCESS,
	GET_PRODUCT_FAIL,
	CLEAR_PRODUCT_REQUEST,
} from '../types/product';

const initialState = {
	product: {},
	loading: false,
	errors: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_PRODUCT_REQUEST:
			return {
				...state,
				loading: true,
				errors: [],
			};
		case GET_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				product: action.payload,
				errors: [],
			};
		case GET_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				errors: [action.payload],
			};
		case CLEAR_PRODUCT_REQUEST:
			return {
				product: {},
				loading: false,
				errors: [],
			};
		default:
			return state;
	}
};
