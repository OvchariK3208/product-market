import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchProductsAll } from '../store/products/asyncActions';
import { Product } from '../store/products/types';
import Container from '../components/Container';
import ProductHeader from '../components/ProductHeader';
import ProductCard from '../components/ProductCard';

const Products: React.FC = () => {
	const dispatch = useAppDispatch();
	const { products, loading, error } = useAppSelector(state => state.products);
	//const [limit, setLimit] = useState<number>(9);
	//console.log("limit",limit)

	useEffect(() => {
		dispatch(fetchProductsAll({ errorMessage: 'Ошибка сервера!' }));
	}, [dispatch]); //, limit]);

	const handleLimitChange = (newLimit: number) => {
		//	setLimit(newLimit);
	};

	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>{error}</p>;

	return (
		<section className='py-10'>
			<Container>
				{/*<ProductHeader
					selectedLimit={limit}
					onLimitChange={handleLimitChange}
				/>*/}
				<div className='grid grid-cols-3 gap-2'>
					{products.map((product: Product) => (
						<ProductCard key={product.id} {...product} />
					))}
				</div>
			</Container>
		</section>
	);
};

export default Products;