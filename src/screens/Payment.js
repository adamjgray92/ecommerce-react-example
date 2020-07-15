import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { savePayment } from '../actions/cart';
import CheckoutSteps from '../components/CheckoutSteps';

const Payment = (props) => {
	const [paymentMethod, setPaymentMethod] = useState('');

	const userSelector = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const { user, loading, errors } = userSelector;

	const paymentHandler = (e) => {
		e.preventDefault();

		dispatch(savePayment({ paymentMethod }));
		props.history.push('/placeorder');
	};

	return (
		<React.Fragment>
			<div>
				<CheckoutSteps step1={true} step2={true} step3={true} />
			</div>
			<div className='form'>
				<form onSubmit={paymentHandler}>
					<ul className='form-container'>
						<li>
							<h2>Payment</h2>
						</li>
						<li>{errors.length > 0 && <div>{errors[0]}</div>}</li>
						<li>
							<div>
								<label htmlFor='paymentMethod'>PayPal</label>
								<input
									type='radio'
									name='paymentMethod'
									id='paymentMethod'
									value='paypal'
									onChange={(e) => setPaymentMethod(e.target.value)}
								/>
							</div>
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

export default Payment;
