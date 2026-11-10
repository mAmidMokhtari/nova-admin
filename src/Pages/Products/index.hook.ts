import { useEffect, useMemo, useState } from 'react';

import { useDictionary } from '@/Dictionary';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import {
  createProduct,
  fetchProductCategories,
  fetchProducts,
  selectProductCategories,
  selectProductCategoriesStatus,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
} from '@/Redux/slices/productsSlice';
import { selectLocale } from '@/Redux/slices/settingsSlice';
import { toastShown } from '@/Redux/slices/toastSlice';
import type { CreateProductPayload } from '@/types';
import { RequestStatus, ToastType } from '@/types/Enums';
import { getErrorMessage } from '@/Utils/errors';
import { formatNumber, interpolate } from '@/Utils/formatters';
import { matchesQuery } from '@/Utils/search';

/** State and handlers of the products page. */
export function useProductsPage() {
  /* ---- State ---- */
  const dispatch = useAppDispatch();
  const dictionary = useDictionary();
  const locale = useAppSelector(selectLocale);
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);
  const errorCode = useAppSelector(selectProductsError);
  const categories = useAppSelector(selectProductCategories);
  const categoriesStatus = useAppSelector(selectProductCategoriesStatus);

  const [query, setQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const visibleProducts = useMemo(
    () => products.filter((product) => matchesQuery(query, [product.title, product.category])),
    [products, query],
  );

  const countLabel = interpolate(dictionary.products.count, {
    count: formatNumber(visibleProducts.length, locale),
  });

  /* ---- Handlers ---- */
  const handleRetry = (): void => {
    void dispatch(fetchProducts());
  };

  const handleCreate = async (payload: CreateProductPayload): Promise<void> => {
    try {
      await dispatch(createProduct(payload)).unwrap();
      dispatch(toastShown(ToastType.Success, dictionary.products.created));
      setIsCreateOpen(false);
    } catch (error) {
      dispatch(toastShown(ToastType.Error, getErrorMessage(error, dictionary)));
    }
  };

  /* ---- LifeCycles ---- */
  // Fetch once per session: a refetch would drop the rows the mock API did not persist.
  useEffect(() => {
    if (status === RequestStatus.Idle) void dispatch(fetchProducts());
  }, [dispatch, status]);

  useEffect(() => {
    if (categoriesStatus === RequestStatus.Idle) void dispatch(fetchProductCategories());
  }, [dispatch, categoriesStatus]);

  /* ---- Return ---- */
  return {
    dictionary,
    query,
    setQuery,
    visibleProducts,
    countLabel,
    categories,
    isLoading: status === RequestStatus.Idle || status === RequestStatus.Loading,
    errorMessage: status === RequestStatus.Failed ? getErrorMessage(errorCode, dictionary) : null,
    isEmpty: products.length === 0,
    isCreateOpen,
    openCreate: () => setIsCreateOpen(true),
    closeCreate: () => setIsCreateOpen(false),
    handleCreate,
    handleRetry,
  };
}
