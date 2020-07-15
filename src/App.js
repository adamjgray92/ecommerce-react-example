import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';

import HomeScreen from './screens/Home';
import ProductScreen from './screens/Product';
import AdminProductScreen from './screens/admin/Products';
import CartScreen from './screens/Cart';
import SignInScreen from './screens/SignIn';
import RegisterScreen from './screens/Register';
import ShippingScreen from './screens/Shipping';
import PaymentScreen from './screens/Payment';
import PlaceOrderScreen from './screens/PlaceOrder';

function App() {
	const userSelector = useSelector((state) => state.user);

	const { user } = userSelector;

	const openMenu = () => {
		document.querySelector('.sidebar').classList.add('open');
	};

	const closeMenu = () => {
		document.querySelector('.sidebar').classList.remove('open');
	};

	return (
		<Router>
			<div className='grid-container'>
				<header className='header'>
					<div className='brand'>
						<button onClick={openMenu}>&#9776;</button>
						<Link to='/'>Amazona</Link>
					</div>
					<div className='header-links'>
						<Link to='/cart'>Cart</Link>
						{user ? (
							<Link to='/account'>My Account</Link>
						) : (
							<Link to='/signin'>Sign in</Link>
						)}
					</div>
				</header>
				<aside className='sidebar'>
					<h3>Shopping Categories</h3>
					<button className='sidebar-close' onClick={closeMenu}>
						X
					</button>
					<ul>
						<li>
							<a href='index.html'>Pants</a>
						</li>
						<li>
							<a href='index.html'>Shirts</a>
						</li>
					</ul>
				</aside>
				<main className='main'>
					<div className='content'>
						<Route path='/product/:id' component={ProductScreen} />
						<Route path='/admin/products' component={AdminProductScreen} />
						<Route path='/cart/:id?' component={CartScreen} />
						<Route path='/signin' component={SignInScreen} />
						<Route path='/register' component={RegisterScreen} />
						<Route path='/shipping' component={ShippingScreen} />
						<Route path='/payment' component={PaymentScreen} />
						<Route path='/placeorder' component={PlaceOrderScreen} />
						<Route path='/' exact component={HomeScreen} />
					</div>
				</main>
				<footer className='footer'>All rights reserved.</footer>
			</div>
		</Router>
	);
}

export default App;
