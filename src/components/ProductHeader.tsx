import React from 'react';

interface ProductHeaderProps {
	selectedLimit: number;
	onLimitChange: (limit: number) => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
	selectedLimit,
	onLimitChange,
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newLimit = parseInt(event.target.value, 10);
		onLimitChange(newLimit);
	};

	return (
		<div className='flex items-center justify-between py-5'>
			<h1 className='text-xl'>Product List</h1>
			<select
				value={selectedLimit}
				onChange={handleChange}
				className='p-2 rounded bg-white border-[0.2px] border-black'>
				<option value={9}>9</option>
				<option value={15}>15</option>
				<option value={20}>All</option>
			</select>
		</div>
	);
};

export default ProductHeader;