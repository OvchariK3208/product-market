import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import logoSvg from '../assets/img/pm-logo.svg';

const Header: React.FC = () => {
	return (
		<header className='shadow-lg shadow-black/5 border-b py-5'>
			<Container>
				<nav className='flex justify-between items-center'>
					{/* Logo */}
					<Link to='/'>
						<img width="32" src={logoSvg} alt="Product Market Logo" />
					</Link>
					<ul className='flex space-x-6'>
						<li>
							<Link
								to='/'
								className='text-center px-1 capitalize text-nowrap text-xl relative after:bg-slate-900 after:absolute after:h-[2px] after:w-0 after:-bottom-0.5 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer'>
								Home
							</Link>
						</li>
						<li>
							<Link
								to='/products'
								className='text-center px-1 capitalize text-nowrap text-xl relative after:bg-slate-900 after:absolute after:h-[2px] after:w-0 after:-bottom-0.5 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer'>
								Products
							</Link>
						</li>
						<li>
							<Link
								to='/product-creation'
								className='text-center px-1 capitalize text-nowrap text-xl relative after:bg-slate-900 after:absolute after:h-[2px] after:w-0 after:-bottom-0.5 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer'>
								Product Creation
							</Link>
						</li>
					</ul>
				</nav>
			</Container>
		</header>
	);
};

export default Header;