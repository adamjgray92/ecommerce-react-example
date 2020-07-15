import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { saveProduct, deleteProduct } from '../../actions/product';
import { fetchProducts } from '../../actions/products';
import product from '../../reducers/product';

const Products = (props) => {
	const [modalVisible, setModelVisible] = useState(false);
	const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [stockCount, setStockCount] = useState('');
	const [description, setDescription] = useState('');

	const adminProductSelector = useSelector((state) => state.adminProduct);
	const productsSelector = useSelector((state) => state.products);
	const dispatch = useDispatch();

	const { success, loading, errors } = adminProductSelector;
	const { products, productsLoading, productsErrors } = productsSelector;

	useEffect(() => {
		if (success) {
			setModelVisible(false);
		}
		dispatch(fetchProducts());
	}, [success]);

	const saveProductHandler = (e) => {
		e.preventDefault();

		dispatch(
			saveProduct({
				_id: id,
				name,
				price,
				image,
				brand,
				category,
				stockCount,
				description,
			})
		);
	};

	const deleteHandler = (product) => {
		dispatch(deleteProduct(product._id));
	};

	const openModal = (product) => {
		setId(product._id);
		setName(product.name);
		setPrice(product.price);
		setImage(product.image);
		setBrand(product.brand);
		setCategory(product.category);
		setStockCount(product.stock_count);
		setDescription(product.description);

		setModelVisible(true);
	};

	return (
		<Fragment>
			<div className='content content-margined'>
				<div className='product-header'>
					<h3>Products</h3>
					<button className='button primary' onClick={() => openModal({})}>
						Create Product
					</button>
				</div>
				<div className='product-list'>
					<table className='table'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Price</th>
								<th>Category</th>
								<th>Brand</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{products.length > 0 ? (
								products.map((product) => (
									<tr key={product._id}>
										<td>{product._id}</td>
										<td>{product.name}</td>
										<td>{product.price}</td>
										<td>{product.category}</td>
										<td>{product.brand}</td>
										<td>
											<button
												className='button'
												onClick={() => openModal(product)}
											>
												Edit
											</button>{' '}
											<button
												className='button'
												onClick={() => deleteHandler(product)}
											>
												Delete
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan='6'>No products</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			{modalVisible && (
				<div className='form'>
					<form onSubmit={saveProductHandler}>
						<ul className='form-container'>
							<li>
								<h2>{id ? 'Edit' : 'Create'} Product</h2>
							</li>
							<li>{loading && <div>Loading...</div>}</li>
							<li>{errors.length > 0 && <div>{errors[0]}</div>}</li>
							<li>
								<label htmlFor='name'>Name</label>
								<input
									type='text'
									name='name'
									id='name'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</li>
							<li>
								<label htmlFor='price'>Price</label>
								<input
									type='text'
									name='price'
									id='price'
									value={price}
									onChange={(e) => setPrice(e.target.value)}
								/>
							</li>
							<li>
								<label htmlFor='image'>Image</label>
								<input
									type='text'
									name='image'
									id='image'
									value={image}
									onChange={(e) => setImage(e.target.value)}
								/>
							</li>
							<li>
								<label htmlFor='brand'>Brand</label>
								<input
									type='text'
									name='brand'
									id='brand'
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
								/>
							</li>
							<li>
								<label htmlFor='category'>Category</label>
								<input
									type='text'
									name='category'
									id='category'
									value={category}
									onChange={(e) => setCategory(e.target.value)}
								/>
							</li>
							<li>
								<label htmlFor='stockCount'>Stock</label>
								<input
									type='text'
									name='stockCount'
									id='stockCount'
									value={stockCount}
									onChange={(e) => setStockCount(e.target.value)}
								/>
							</li>
							<li>
								<label htmlFor='description'>Description</label>
								<textarea
									name='description'
									id='description'
									onChange={(e) => setDescription(e.target.value)}
								>
									{description}
								</textarea>
							</li>
							<li>
								<button type='submit' className='button primary'>
									{id ? 'Edit Product' : 'Create Product'}
								</button>
								<button
									onClick={() => setModelVisible(false)}
									type='button'
									className='button secondary'
								>
									Back
								</button>
							</li>
						</ul>
					</form>
				</div>
			)}
		</Fragment>
	);
};

export default Products;
