import { createSlice } from '@reduxjs/toolkit';
import { Product } from './types';
import {
	fetchProductsAll,
	addNewProduct,
	getProduct,
	updateProduct,
	deleteProduct,
} from './asyncActions';

interface ProductState {
	products: Product[];
	loading: boolean;
	error: string | null;
}

const initialState: ProductState = {
	products: [],
	loading: false,
	error: null,
};

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchProductsAll.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProductsAll.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(fetchProductsAll.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Error loading products';
			})
			.addCase(addNewProduct.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addNewProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products.push(action.payload);
			})
			.addCase(addNewProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Error adding new product';
			})
			.addCase(getProduct.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(getProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Error fetching product';
			})
			.addCase(updateProduct.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products = state.products.map(product =>
					product.id === action.payload.id ? action.payload : product,
				);
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Error updating product';
			})
			.addCase(deleteProduct.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products = state.products.filter(
					product => product.id !== action.payload.id,
				);
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Error deleting product';
			});
	},
});

export default productSlice.reducer;