import React from 'react';

interface Props {
	className?: string;
}

const Container: React.FC<React.PropsWithChildren<Props>> = ({
	className,
	children,
}) => {
	return <div className='mx-auto max-w-5xl w-full px-5'>{children}</div>;
};

export default Container;