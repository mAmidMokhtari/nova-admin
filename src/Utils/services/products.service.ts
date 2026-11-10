import type { CreateProductPayload, Product } from '@/types';
import { axiosInstance } from '@/Utils/api/axiosInstance';
import { ENDPOINTS } from '@/Utils/api/endpoints';

/** Fetches the full product list; the API has no server-side paging. */
export async function getProducts(): Promise<Product[]> {
  const { data } = await axiosInstance.get<Product[]>(ENDPOINTS.products);
  return data;
}

/** Fetches the category names used by the create-product form. */
export async function getProductCategories(): Promise<string[]> {
  const { data } = await axiosInstance.get<string[]>(ENDPOINTS.productCategories);
  return data;
}

/** Creates a product. The mock API echoes the body with an id but does not persist it. */
export async function createProduct(payload: CreateProductPayload): Promise<Product> {
  const { data } = await axiosInstance.post<Product>(ENDPOINTS.products, payload);
  return { ...payload, ...data };
}
