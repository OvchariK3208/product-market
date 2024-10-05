import React from 'react';

const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
	return <div className='mx-auto max-w-5xl w-full px-5'>{children}</div>;
};

export default Container;