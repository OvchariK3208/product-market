import React, {useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch} from '../hooks';
import {addNewProduct} from '../store/products/asyncActions';
import {Product} from '../store/products/types';
import Container from '../components/Container';

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

const ProductCreation: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [createdProduct, setCreatedProduct] = useState<Product | null>(null);
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		reset,
		formState: {errors},
	} = useForm<Product>({
		resolver: yupResolver(schema),
		defaultValues: {
			id: String(Math.floor(Math.random() * 81) + 20),
			rating: parseFloat((Math.random() * (4.9 - 4.0) + 4.0).toFixed(1)),
			title: 'Cargo Pants',
			price: 230,
			description: 'Black Stretch Cotton Gabardine',
			category: 'For Him',
			image:
				'https://assets.christiandior.com/is/image/diorprod/013C101A3866C900_E01-1?$default_GHC_1080$&crop=740,150,521,1466&bfc=on&qlt=85',
		},
	});

	const onSubmit: SubmitHandler<Product> = data => {
		console.log(data);
		dispatch(addNewProduct({data, errorMessage: 'Error Server!'}));
		setCreatedProduct(data);
		setProducts(prevProducts => [...prevProducts, data]);
		reset();
	};

	return (
		<section className='py-10'>
			<Container>
				<h1 className='text-xl py-5'>Product Creation</h1>
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
						Create product
					</button>
				</form>

				{createdProduct && (
					<div className='flex flex-col gap-4 p-5 max-w-xl bg-white rounded border-[0.2px] border-black'>
						<h3 className='text-lg capitalize'>Created Product</h3>
						<div className='flex flex-col gap-2'>
							<p className='text-sm capitalize'>
								Title: {createdProduct.title}
							</p>
							<p className='text-sm capitalize'>
								Price: ${createdProduct.price}
							</p>
							<p className='text-sm capitalize'>
								Description: {createdProduct.description}
							</p>
							<p className='text-sm capitalize'>
								Category: {createdProduct.category}
							</p>
							<img
								className='w-40 h-40 object-cover'
								src={createdProduct.image}
								alt={createdProduct.title}
							/>
						</div>
					</div>
				)}

				<div className='w-full py-5'>
					<h3 className='text-lg capitalize'>Created Products</h3>
					<table className='min-w-full divide-y divide-gray-200 rounded border-[0.2px] border-black'>
						<thead className='bg-gray-50'>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Title
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Price
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Description
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Category
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Image
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									rating
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									id
								</th>
							</tr>
						</thead>
						<tbody className='bg-white divide-y divide-gray-200'>
							{products.map(product => (
								<tr key={product.title}>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{product.title}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										${product.price}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{product.description}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{product.category}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										<img
											src={product.image}
											alt={product.title}
											className='w-20 h-20 object-cover'
										/>
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{product.rating}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{product.id}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Container>
		</section>
	);
};

export default ProductCreation;
