import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchProduct, clearProduct } from '../actions/product';

function Product(props) {
	const productId = props.match.params.id;
	const [quantity, setQuantity] = useState(1);
	const productSelector = useSelector((state) => state.product);
	const dispatch = useDispatch();

	const { product, loading, errors } = productSelector;

	useEffect(() => {
		dispatch(fetchProduct(productId));

		return () => {
			dispatch(clearProduct());
		};
	}, []);

	const handleAddToCart = () => {
		props.history.push('/cart/' + productId + '/?quantity=' + quantity);
	};

	return loading ? (
		<div>Loading...</div>
	) : errors.length > 0 ? (
		<div>
			Errors:
			<ul>
				{errors.map((error) => (
					<li key={error}>{error}</li>
				))}
			</ul>
		</div>
	) : (
		<div>
			<div className='back-to-result'>
				<Link to='/'>Back to results</Link>
			</div>
			<div className='details'>
				<div className='details-image'>
					<img src={product.image} alt={product.name} />
				</div>
				<div className='details-info'>
					<ul>
						<li>
							<h4>{product.name}</h4>
						</li>
						<li>
							{product.rating} Starts ({product.review_count} Reviews)
						</li>
						<li>
							Price:
							<strong>£{product.price}</strong>
						</li>
						<li>
							Description:
							<div>{product.description}</div>
						</li>
					</ul>
				</div>
				<div className='details-action'>
					<ul>
						<li>Price: {product.price}</li>
						<li>
							Status: {product.stock_count > 0 ? 'In Stock' : 'Unavailable'}
						</li>
						{product.stock_count > 0 && (
							<li>
								Qty:
								<select
									value={quantity}
									onChange={(e) => setQuantity(e.target.value)}
								>
									{[...Array(product.stock_count).keys()].map((value) => (
										<option key={value} value={value + 1}>
											{value + 1}
										</option>
									))}
								</select>
							</li>
						)}
						<li>
							{product.stock_count > 0 && (
								<button className='button primary' onClick={handleAddToCart}>
									Add to Cart
								</button>
							)}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Product;
