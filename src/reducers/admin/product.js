import {
	SET_PRODUCT_REQUEST,
	SET_PRODUCT_SUCCESS,
	SET_PRODUCT_FAIL,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAIL,
} from '../../types/product';

const initialState = {
	product: {},
	success: false,
	loading: false,
	errors: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PRODUCT_REQUEST:
		case DELETE_PRODUCT_REQUEST:
			return {
				...state,
				success: false,
				loading: true,
				errors: [],
			};
		case SET_PRODUCT_SUCCESS:
		case DELETE_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				product: action.payload,
				errors: [],
			};
		case SET_PRODUCT_FAIL:
		case DELETE_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				product: {},
				errors: [action.payload],
			};
		default:
			return state;
	}
};
