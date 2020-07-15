import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../actions/products';

function Home() {
	const productSelector = useSelector((state) => state.products);
	const { products, loading, errors } = productSelector;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	return loading ? (
		<div>Loading</div>
	) : (
		<div>
			<ul className='products'>
				{products.map((product) => (
					<li key={product._id}>
						<div className='product'>
							<Link to={'/product/' + product._id}>
								<img
									className='product-image'
									src={product.image}
									alt='Product'
								/>
							</Link>
							<div className='product-name'>
								<Link to={'/product/' + product._id}>{product.name}</Link>
							</div>
							<div className='product-brand'>{product.brand}</div>
							<div className='product-price'>{product.price}</div>
							<div className='product-rating'>
								{product.rating} Starts ({product.review_count} Reviews)
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Home;
