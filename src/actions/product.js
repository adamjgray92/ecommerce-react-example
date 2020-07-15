import axios from 'axios';

import {
	GET_PRODUCT_REQUEST,
	GET_PRODUCT_SUCCESS,
	GET_PRODUCT_FAIL,
	CLEAR_PRODUCT_REQUEST,
	SET_PRODUCT_REQUEST,
	SET_PRODUCT_SUCCESS,
	SET_PRODUCT_FAIL,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAIL,
} from '../types/product';

export const fetchProduct = (id) => async (dispatch) => {
	try {
		dispatch({ type: GET_PRODUCT_REQUEST });

		const { data } = await axios.get(`/api/products/${id}`);
		dispatch({ type: GET_PRODUCT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_PRODUCT_FAIL, payload: error.message });
	}
};

export const clearProduct = () => async (dispatch) => {
	dispatch({ type: CLEAR_PRODUCT_REQUEST });
};

export const saveProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({ type: SET_PRODUCT_REQUEST });

		const newProduct = {
			name: product.name,
			price: product.price,
			image: product.image,
			brand: product.brand,
			category: product.category,
			stock_count: product.stockCount,
			description: product.description,
		};

		const {
			user: { user },
		} = getState();

		if (product._id) {
			const { data } = await axios.put(
				'/api/products/' + product._id,
				newProduct,
				{
					headers: { Authorization: 'Bearer ' + user.token },
				}
			);

			dispatch({ type: SET_PRODUCT_SUCCESS, payload: data });
		} else {
			const { data } = await axios.post('/api/products', newProduct, {
				headers: { Authorization: 'Bearer ' + user.token },
			});

			dispatch({ type: SET_PRODUCT_SUCCESS, payload: data });
		}
	} catch (error) {
		dispatch({ type: SET_PRODUCT_FAIL, payload: error.message });
	}
};

export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: DELETE_PRODUCT_REQUEST });

		const {
			user: { user },
		} = getState();

		const { data } = await axios.delete('/api/products/' + id, {
			headers: {
				Authorization: 'Bearer ' + user.token,
			},
		});

		dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
	} catch (err) {
		dispatch({ type: DELETE_PRODUCT_FAIL, payload: err.message });
	}
};
