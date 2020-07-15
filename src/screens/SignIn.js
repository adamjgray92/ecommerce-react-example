import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signIn } from '../actions/user';

const SignIn = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const userSelector = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const { user, loading, errors } = userSelector;

	const redirect = props.location.search
		? props.location.search.split('=')[1]
		: '/';

	useEffect(() => {
		if (user) {
			console.log(redirect);
			props.history.push(redirect);
		}
	}, [user]);

	const loginHandler = (e) => {
		e.preventDefault();

		dispatch(signIn(email, password));
	};

	return (
		<div className='form'>
			<form onSubmit={loginHandler}>
				<ul className='form-container'>
					<li>
						<h2>Sign-In</h2>
					</li>
					<li>{loading && <div>Loading...</div>}</li>
					<li>{errors.length > 0 && <div>{errors[0]}</div>}</li>
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
						<button type='submit' className='button primary'>
							Signin
						</button>
					</li>
					<li>New to Amazona?</li>
					<li>
						<Link
							to={
								redirect === '/' ? 'register' : 'register?redirect=' + redirect
							}
							className='button secondary text-center'
						>
							Create your Amazona account
						</Link>
					</li>
				</ul>
			</form>
		</div>
	);
};

export default SignIn;
