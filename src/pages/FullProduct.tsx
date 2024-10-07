import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getProduct, deleteProduct } from '../store/products/asyncActions';
import Container from '../components/Container';
import Loader from './Loader';
import NotFound from './NotFound';

const FullProduct: React.FC = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const { products, loading, error } = useAppSelector(state => state.products);
	const [showNotification, setShowNotification] = useState(false);
	const product = products.find(product => product.id === id);

	useEffect(() => {
		if (id) {
			const existingProduct = products.find(product => product.id === id);
			if (!existingProduct) {
				dispatch(
					getProduct({
						id,
						errorMessage: 'Unfortunately, we were unable to load the product.',
					}),
				);
			}
		}
	}, [dispatch, id, products]);

	const handleDelete = () => {
		if (id) {
			dispatch(
				deleteProduct({
					id,
					errorMessage: 'Unfortunately, we were unable to delete the product.',
				}),
			);
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false);
			}, 5000);
		}
	};

	if (loading) return <Loader />;
	if (error) return <NotFound />;
	if (!product) return <p>Unfortunately, the product was not found.</p>;

	const { title, price, description, category, image, rating } = product;

	return (
		<section>
			<Container>
				<div className='flex justify-between'>
					<div className='w-1/2 h-full'>
						<img
							src={image}
							alt={title}
							className='w-full h-full object-cover'
						/>
					</div>
					<div className='w-1/2 h-screen p-10 flex flex-col gap-5'>
						<h1 className='text-xl'>{title}</h1>
						<div className='flex flex-col text-slate-500'>
							<p className='text-sm capitalize'>price: {price}</p>
							<p className='text-sm capitalize'>category: {category}</p>
							<p className='text-sm capitalize'>rating: {rating}</p>
						</div>
						<div className='flex flex-col'>
							<p className='text-base capitalize'>description</p>
							<p className='text-sm line-clamp-3 hover:line-clamp-none'>
								{description}
							</p>
						</div>
						<div className='flex flex-col gap-4'>
							<Link
								to={`/product-update/${id}`}
								className='rounded bg-white border-[0.2px] text-center px-4 py-2 border border-black capitalize text-nowrap text-xl cursor-pointer'>
								Update
							</Link>
							<button
								onClick={handleDelete}
								className='rounded bg-red-100 text-black text-center px-4 py-2 border border-black capitalize text-nowrap text-xl cursor-pointer'>
								Delete
							</button>
						</div>
					</div>
				</div>
				{showNotification && (
					<div className='fixed bottom-4 right-4 bg-green-100 text-black p-3 rounded'>
						Product has been successfully deleted.
					</div>
				)}
			</Container>
		</section>
	);
};

export default FullProduct;