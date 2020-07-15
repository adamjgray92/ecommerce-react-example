import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import products from './reducers/products';
import product from './reducers/product';
import adminProduct from './reducers/admin/product';
import cart from './reducers/cart';
import user from './reducers/user';

const initialState = {};
const reducer = combineReducers({
	products,
	product,
	cart,
	user,
	adminProduct,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	composeEnhancer(applyMiddleware(thunk))
);

export default store;
