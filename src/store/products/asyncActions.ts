import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from './types';
import http from '../../http';

interface FetchProductsAllParams {
	limit: number;
	page: number;
	errorMessage: string;
}

interface AddNewProductParams {
	data: Product;
	errorMessage: string;
}

interface GetProductParams {
	id: string;
	errorMessage: string;
}

interface UpdateProductParams {
	id: string;
	data: Product;
	errorMessage: string;
}

interface DeleteProductParams {
	id: string;
	errorMessage: string;
}

export const fetchProductsAll = createAsyncThunk(
	'products/fetchProductsAll',
	async ({ limit, page, errorMessage }: FetchProductsAllParams) => {
		try {
			const response = await http.get<Product[]>('/products', {
				params: {
					limit,
					page,
				},
			});
			return response.data;
		} catch (error) {
			console.error(error);
			throw new Error(errorMessage);
		}
	},
);

export const addNewProduct = createAsyncThunk(
	'products/addNewProduct',
	async ({ data, errorMessage }: AddNewProductParams) => {
		try {
			const response = await http.post<Product>('/products', data);
			return response.data;
		} catch (error) {
			console.error(error);
			throw new Error(errorMessage);
		}
	},
);

export const getProduct = createAsyncThunk(
	'products/getProduct',
	async ({ id, errorMessage }: GetProductParams) => {
		try {
			const response = await http.get<Product>(`/products/${id}`);
			return response.data;
		} catch (error) {
			console.error(error);
			throw new Error(errorMessage);
		}
	},
);

export const updateProduct = createAsyncThunk(
	'products/updateProduct',
	async ({ id, data, errorMessage }: UpdateProductParams) => {
		try {
			const response = await http.put<Product>(`/products/${id}`, data);
			return response.data;
		} catch (error) {
			console.error(error);
			throw new Error(errorMessage);
		}
	},
);

export const deleteProduct = createAsyncThunk(
	'products/deleteProduct',
	async ({ id, errorMessage }: DeleteProductParams) => {
		try {
			const response = await http.delete<Product>(`/products/${id}`);
			return response.data;
		} catch (error) {
			console.error(error)!;
			throw new Error(errorMessage);
		}
	},
);