import React, { useState } from 'react';
import { Product } from '../store/products/types';
import { Link } from 'react-router-dom';

const ProductCard: React.FC<Product> = ({ id, title, image }) => {
	return (
		<Link to={`/product/${id}`}>
			<div className='flex flex-col justify-between h-full'>
				<img src={image} alt={title} className='w-full h-full object-cover' />
				<h2 className='w-full h-full text-lg pt-2 px-5'>{title}</h2>
			</div>
		</Link>
	);
};

export default ProductCard;