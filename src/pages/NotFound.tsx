import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

const NotFound: React.FC = () => {
	return (
		<section className='py-20'>
			<Container>
				<div className='flex flex-col items-center justify-center gap-10'>
					<h1 className='text-xl'>Page Not Found</h1>
					<p className='text-lg'>Sorry, we couldn't find the page.</p>
					<Link
						to='/products'
						className='rounded bg-white border-[0.2px] text-center px-4 py-2 border border-black capitalize text-nowrap text-xl cursor-pointer'>
						Go to Products
					</Link>
				</div>
			</Container>
		</section>
	);
};

export default NotFound;