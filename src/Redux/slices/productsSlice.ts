import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { CreateProductPayload, Product } from '@/types';
import { ApiErrorCode, RequestStatus } from '@/types/Enums';
import { toApiErrorCode } from '@/Utils/api/ApiError';
import { getNextId } from '@/Utils/collections';
import * as productsService from '@/Utils/services/products.service';

import type { RootState } from '../store';

type ProductsState = {
  items: Product[];
  status: RequestStatus;
  error: ApiErrorCode | null;
  categories: string[];
  categoriesStatus: RequestStatus;
};

const initialState: ProductsState = {
  items: [],
  status: RequestStatus.Idle,
  error: null,
  categories: [],
  categoriesStatus: RequestStatus.Idle,
};

type ThunkConfig = { rejectValue: ApiErrorCode; state: RootState };

export const fetchProducts = createAsyncThunk<Product[], void, ThunkConfig>(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await productsService.getProducts();
    } catch (error) {
      return rejectWithValue(toApiErrorCode(error));
    }
  },
  {
    // Skips a second request while one is in flight (e.g. StrictMode double effects).
    condition: (_, { getState }) => getState().products.status !== RequestStatus.Loading,
  },
);

export const fetchProductCategories = createAsyncThunk<string[], void, ThunkConfig>(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await productsService.getProductCategories();
    } catch (error) {
      return rejectWithValue(toApiErrorCode(error));
    }
  },
  {
    condition: (_, { getState }) => getState().products.categoriesStatus !== RequestStatus.Loading,
  },
);

export const createProduct = createAsyncThunk<Product, CreateProductPayload, ThunkConfig>(
  'products/create',
  async (payload, { rejectWithValue }) => {
    try {
      return await productsService.createProduct(payload);
    } catch (error) {
      return rejectWithValue(toApiErrorCode(error));
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.payload ?? ApiErrorCode.Unknown;
      })
      .addCase(fetchProductCategories.pending, (state) => {
        state.categoriesStatus = RequestStatus.Loading;
      })
      .addCase(fetchProductCategories.fulfilled, (state, action) => {
        state.categoriesStatus = RequestStatus.Succeeded;
        state.categories = action.payload;
      })
      .addCase(fetchProductCategories.rejected, (state) => {
        state.categoriesStatus = RequestStatus.Failed;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        // The mock API returns the same id for every POST, so ids are kept unique locally.
        const isTaken = state.items.some((item) => item.id === action.payload.id);
        const id = isTaken ? getNextId(state.items) : action.payload.id;

        state.items.unshift({ ...action.payload, id });
      });
  },
});

export const productsReducer = productsSlice.reducer;

export const selectProducts = (state: RootState): Product[] => state.products.items;
export const selectProductsStatus = (state: RootState): RequestStatus => state.products.status;
export const selectProductsError = (state: RootState): ApiErrorCode | null => state.products.error;
export const selectProductCategories = (state: RootState): string[] => state.products.categories;
export const selectProductCategoriesStatus = (state: RootState): RequestStatus =>
  state.products.categoriesStatus;
