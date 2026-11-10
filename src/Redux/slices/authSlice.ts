import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { sessionStorageService } from '@/Storage/sessionStorage';
import type { LoginPayload, Session } from '@/types';
import { ApiErrorCode, RequestStatus } from '@/types/Enums';
import { toApiErrorCode } from '@/Utils/api/ApiError';
import * as authService from '@/Utils/services/auth.service';

import type { RootState } from '../store';

type AuthState = {
  session: Session | null;
  status: RequestStatus;
  error: ApiErrorCode | null;
};

const initialState: AuthState = {
  session: sessionStorageService.read(),
  status: RequestStatus.Idle,
  error: null,
};

/** Signs the admin in and resolves with the session to keep. */
export const login = createAsyncThunk<Session, LoginPayload, { rejectValue: ApiErrorCode }>(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const { token } = await authService.login(payload);
      return { token, username: payload.username };
    } catch (error) {
      return rejectWithValue(toApiErrorCode(error));
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedOut(state) {
      state.session = null;
      state.status = RequestStatus.Idle;
      state.error = null;
    },
    loginErrorCleared(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.session = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.payload ?? ApiErrorCode.Unknown;
      });
  },
});

export const { loggedOut, loginErrorCleared } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectSession = (state: RootState): Session | null => state.auth.session;
export const selectIsAuthenticated = (state: RootState): boolean => state.auth.session !== null;
export const selectLoginStatus = (state: RootState): RequestStatus => state.auth.status;
export const selectLoginError = (state: RootState): ApiErrorCode | null => state.auth.error;
