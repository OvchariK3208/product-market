import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchProductsAll } from '../store/products/asyncActions';
import { Product } from '../store/products/types';
import Container from '../components/Container';
import ProductHeader from '../components/ProductHeader';
import ProductCard from '../components/ProductCard';
import Loader from './Loader';
import NotFound from './NotFound';

const Products: React.FC = () => {
	const dispatch = useAppDispatch();
	const { products, loading, error } = useAppSelector(state => state.products);
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(9);

	useEffect(() => {
		dispatch(
			fetchProductsAll({ limit, page, errorMessage: 'Ошибка сервера!' }),
		);
	}, [dispatch, page, limit]);

	const handleLimitChange = (newLimit: number) => {
		setLimit(newLimit);
	};

	if (loading) return <Loader />;
	if (error) return <NotFound />;

	return (
		<section className='py-10'>
			<Container>
				<ProductHeader
					selectedLimit={limit}
					onLimitChange={handleLimitChange}
				/>
				<div className='grid grid-cols-3 gap-2 md:grid-cols-2'>
					{products.map((product: Product) => (
						<ProductCard key={product.id} {...product} />
					))}
				</div>
			</Container>
		</section>
	);
};

export default Products;