import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getProduct, deleteProduct } from '../store/products/asyncActions';
import { Product } from '../store/products/types';
import Container from '../components/Container';

const FullProduct: React.FC = () => {
	const { id } = useParams();
	console.log(id);
	const dispatch = useAppDispatch();
	const { products, loading, error } = useAppSelector(state => state.products);
	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		if (id) {
			// Проверяем, если продукт уже загружен в products, и только в этом случае не загружаем его снова
			const existingProduct = products.find(product => product.id === id);
			if (!existingProduct) {
				dispatch(
					getProduct({ id, errorMessage: 'Не удалось загрузить продукт.' }),
				);
			}
		}
	}, [dispatch, id, products]);

	// Находим продукт в массиве
	const product = products.find(product => product.id === id);
	console.log(product);

	const handleDelete = () => {
		if (id) {
			dispatch(
				deleteProduct({ id, errorMessage: 'Не удалось удалить продукт.' }),
			)
				.unwrap()
				.then(() => {
					setShowNotification(true);
					// Устанавливаем тайм-аут для скрытия уведомления через 5 секунд
					setTimeout(() => {
						setShowNotification(false);
					}, 5000);
				})
				.catch(() => {
					// Обработка ошибки, если необходимо
				});
		}
	};

	if (loading) {
		return <p>Загрузка...</p>;
	}

	if (error) {
		return <p>{error}</p>; // Отображаем сообщение об ошибке, если оно есть
	}

	if (!product) {
		return <p>Продукт не найден.</p>; // Проверяем, что продукт существует
	}
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
								className='rounded bg-red-500 text-white text-center px-4 py-2 border border-black capitalize text-nowrap text-xl cursor-pointer'>
								Delete
							</button>
						</div>
					</div>
				</div>
				{showNotification && (
					<div className='fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded'>
						Product has been successfully deleted.
					</div>
				)}
			</Container>
		</section>
	);
};

export default FullProduct;