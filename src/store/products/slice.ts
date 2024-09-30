import { createSlice } from '@reduxjs/toolkit';
import { Product } from './types';
import { fetchProductsAll } from './asyncActions';

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
				state.error = action.error.message || 'Ошибка загрузки продуктов';
			});
	},
});

export default productSlice.reducer;