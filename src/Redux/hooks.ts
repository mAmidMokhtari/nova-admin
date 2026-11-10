import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from './store';

/** Typed `useDispatch` that understands thunks. */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/** Typed `useSelector` bound to the root state. */
export const useAppSelector = useSelector.withTypes<RootState>();
