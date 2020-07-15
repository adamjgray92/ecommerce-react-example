import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { saveShipping } from '../actions/cart';
import CheckoutSteps from '../components/CheckoutSteps';

const Shipping = (props) => {
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [postCode, setPostCode] = useState('');
	const [country, setCountry] = useState('');

	const userSelector = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const { user, loading, errors } = userSelector;

	const addressHandler = (e) => {
		e.preventDefault();

		dispatch(saveShipping({ address, city, postCode, country }));
		props.history.push('/payment');
	};

	return (
		<React.Fragment>
			<div>
				<CheckoutSteps step1={true} step2={true} />
			</div>
			<div className='form'>
				<form onSubmit={addressHandler}>
					<ul className='form-container'>
						<li>
							<h2>Shipping</h2>
						</li>
						<li>{errors.length > 0 && <div>{errors[0]}</div>}</li>
						<li>
							<label htmlFor='address'>Address</label>
							<input
								type='text'
								name='address'
								id='address'
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</li>
						<li>
							<label htmlFor='city'>City</label>
							<input
								type='text'
								name='city'
								id='city'
								value={city}
								onChange={(e) => setCity(e.target.value)}
							/>
						</li>
						<li>
							<label htmlFor='postcode'>Post Code</label>
							<input
								type='text'
								name='postcode'
								id='postcode'
								value={postCode}
								onChange={(e) => setPostCode(e.target.value)}
							/>
						</li>
						<li>
							<label htmlFor='country'>Country</label>
							<input
								type='text'
								name='country'
								id='country'
								value={country}
								onChange={(e) => setCountry(e.target.value)}
							/>
						</li>
						<li>
							<button type='submit' className='button primary'>
								Continue
							</button>
						</li>
					</ul>
				</form>
			</div>
		</React.Fragment>
	);
};

export default Shipping;
