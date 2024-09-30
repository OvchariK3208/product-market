import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductCreation from './pages/ProductCreation';
import FullProduct from './pages/FullProduct';
import UpdateProduct from './pages/UpdateProduct';

const App: React.FC = () => {
	return (
		<Router>
			<Header />
				<Routes>
					<Route path='*' element={<Home />} />
					<Route path='/products' element={<Products />} />
					<Route path='/product-creation' element={<ProductCreation />} />
					<Route path='/product/:id' element={<FullProduct />} />
					<Route path='/product-update/:id' element={<UpdateProduct />} />
				</Routes>
		</Router>
	);
};

export default App;