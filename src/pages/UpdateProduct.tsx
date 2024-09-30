import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getProduct, updateProduct } from '../store/products/asyncActions';
import { Product } from '../store/products/types';
import Container from '../components/Container';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
	id: yup.string().required(),
	rating: yup.number().required(),
	title: yup
		.string()
		.required('The title field is required. Please provide a title.'),
	price: yup
		.number()
		.required(
			'The price field is required. Please enter the price of the product.',
		)
		.positive(
			'The price must be a positive number. Please enter a valid price.',
		),
	description: yup
		.string()
		.required(
			'The description field is required. Please provide a description of the product.',
		),
	category: yup
		.string()
		.required(
			'The category field is required. Please select a category for the product.',
		),
	image: yup
		.string()
		.required(
			'An image URL is required. Please provide a valid URL for the product image.',
		),
});

const UpdateProduct: React.FC = () => {
	const { id } = useParams();
	console.log(id);
	const dispatch = useAppDispatch();
	const {
		products: productsAll,
		loading,
		error,
	} = useAppSelector(state => state.products);

	const [productUpdate, setProductUpdate] = useState<Product[]>([]);
	const [updateProductData, setUpdateProductData] = useState<Product | null>(
		null,
	);

	const {
		register,
		setValue,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Product>({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		if (id) {
			const existingProduct = productsAll.find(product => product.id === id);
			if (existingProduct) {
				// Заполняем форму данными продукта
				reset(existingProduct);
			} else {
				dispatch(
					getProduct({ id, errorMessage: 'Не удалось загрузить продукт.' }),
				);
			}
		}
	}, [dispatch, id, productsAll, reset]);

	const onSubmit: SubmitHandler<Product> = data => {
		if (id) {
			console.log(data);
			dispatch(updateProduct({ id, data, errorMessage: 'Error Server!' }));
			setUpdateProductData(data);
			setProductUpdate(prevProducts => [...prevProducts, data]);
			reset();
		}
	};
	// Находим продукт в массиве
	//const product = productsAll.find(product => product.id === id);
	// console.log(product);

	if (loading) {
		return <p>Загрузка...</p>;
	}

	if (error) {
		return <p>{error}</p>; // Отображаем сообщение об ошибке, если оно есть
	}

	//  	if (!product) {
	// 		return <p>Продукт не найден.</p>; // Проверяем, что продукт существует
	//	}
	return (
		<section className='py-10'>
			<Container>
				<h1 className='text-xl py-5'>Product Update</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-5 py-5 max-w-xl'>
					<div className='flex flex-col gap-2'>
						<label htmlFor='title' className='text-sm capitalize'>
							Title
						</label>
						<input
							id='title'
							type='text'
							placeholder='Cargo Pants'
							{...register('title')}
							className='capitalize p-2 rounded bg-white border-[0.2px] border-black'
						/>
						{errors.title && (
							<p className='text-red-500'>{errors.title.message}</p>
						)}
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='price' className='text-sm capitalize'>
							Price
						</label>
						<input
							id='price'
							type='number'
							placeholder='240'
							{...register('price')}
							className='capitalize p-2 rounded bg-white border-[0.2px] border-black'
						/>
						{errors.price && (
							<p className='text-red-500'>{errors.price.message}</p>
						)}
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='description' className='text-sm capitalize'>
							description
						</label>
						<textarea
							id='description'
							placeholder='Black Stretch Cotton Gabardine'
							{...register('description')}
							className='p-2 rounded bg-white border-[0.2px] border-black'
						/>
						{errors.description && (
							<p className='text-red-500'>{errors.description.message}</p>
						)}
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='category' className='text-sm capitalize'>
							category
						</label>
						<input
							id='category'
							type='text'
							placeholder='For Him'
							{...register('category')}
							className='capitalize p-2 rounded bg-white border-[0.2px] border-black'
						/>
						{errors.category && (
							<p className='text-red-500'>{errors.category.message}</p>
						)}
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='image' className='text-sm capitalize'>
							image
						</label>
						<input
							id='image'
							type='text'
							placeholder='Link'
							{...register('image')}
							className='p-2 rounded bg-white border-[0.2px] border-black'
						/>
						{errors.image && (
							<p className='text-red-500'>{errors.image.message}</p>
						)}
					</div>

					<button
						type='submit'
						className='capitalize p-3 bg-white rounded border-[0.2px] border-black'>
						Update
					</button>
				</form>

				{updateProductData && (
					<div className='flex flex-col gap-4 p-5 max-w-xl bg-white rounded border-[0.2px] border-black'>
						<h3 className='text-lg capitalize'>Updated Product</h3>
						<div className='flex flex-col gap-2'>
							<p className='text-sm capitalize'>
								Title: {updateProductData.title}
							</p>
							<p className='text-sm capitalize'>
								Price: ${updateProductData.price}
							</p>
							<p className='text-sm capitalize'>
								Description: {updateProductData.description}
							</p>
							<p className='text-sm capitalize'>
								Category: {updateProductData.category}
							</p>
							<img
								className='w-40 h-40 object-cover'
								src={updateProductData.image}
								alt={updateProductData.title}
							/>
						</div>
					</div>
				)}
			</Container>
		</section>
	);
};

export default UpdateProduct;