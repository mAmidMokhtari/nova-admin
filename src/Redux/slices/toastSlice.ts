import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import { ToastType } from '@/types/Enums';

import type { RootState } from '../store';

export type Toast = {
  id: string;
  type: ToastType;
  message: string;
};

const initialState: Toast[] = [];

const toastSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    toastShown: {
      reducer(state, action: PayloadAction<Toast>) {
        state.push(action.payload);
      },
      prepare(type: ToastType, message: string) {
        return { payload: { id: nanoid(), type, message } };
      },
    },
    toastDismissed(state, action: PayloadAction<string>) {
      return state.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { toastShown, toastDismissed } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;

export const selectToasts = (state: RootState): Toast[] => state.toasts;
