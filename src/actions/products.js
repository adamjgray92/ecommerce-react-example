import axios from 'axios';

import {
	GET_PRODUCTS_REQUEST,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_FAIL,
} from '../types/products';

export const fetchProducts = () => async (dispatch) => {
	try {
		dispatch({ type: GET_PRODUCTS_REQUEST });

		const { data } = await axios.get('/api/products');
		dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_PRODUCTS_FAIL, payload: error.message });
	}
};
