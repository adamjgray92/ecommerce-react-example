import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { register } from '../actions/user';

const Register = (props) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordAgain, setPasswordAgain] = useState('');

	const userSelector = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const { user, loading, errors } = userSelector;

	const redirect = props.location.search
		? props.location.search.split('=')[1]
		: '/';

	useEffect(() => {
		if (user) {
			props.history.push(redirect);
		}
	}, [user]);

	const registerHandler = (e) => {
		e.preventDefault();

		dispatch(register(name, email, password));
	};

	return (
		<div className='form'>
			<form onSubmit={registerHandler}>
				<ul className='form-container'>
					<li>
						<h2>Register</h2>
					</li>
					<li>{loading && <div>Loading...</div>}</li>
					<li>{errors.length > 0 && <div>{errors[0]}</div>}</li>
					<li>
						<label htmlFor='name'>Name</label>
						<input
							type='text'
							name='name'
							id='name'
							onChange={(e) => setName(e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							id='email'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor='passwordAgain'>Password Again</label>
						<input
							type='password'
							name='passwordAgain'
							id='passwordAgain'
							onChange={(e) => setPasswordAgain(e.target.value)}
						/>
					</li>
					<li style={{ flexDirection: 'row' }}>
						Already have an account?{' '}
						<Link
							style={{ marginLeft: '.5rem' }}
							to={redirect === '/' ? 'signin' : 'signin?redirect=' + redirect}
						>
							Sign in
						</Link>
					</li>
					<li>
						<button type='submit' className='button primary'>
							Sign Up
						</button>
					</li>
				</ul>
			</form>
		</div>
	);
};

export default Register;
