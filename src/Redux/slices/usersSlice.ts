import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { CreateUserPayload, User } from '@/types';
import { ApiErrorCode, RequestStatus } from '@/types/Enums';
import { toApiErrorCode } from '@/Utils/api/ApiError';
import { getNextId } from '@/Utils/collections';
import * as usersService from '@/Utils/services/users.service';

import type { RootState } from '../store';

type UsersState = {
  items: User[];
  status: RequestStatus;
  error: ApiErrorCode | null;
};

const initialState: UsersState = {
  items: [],
  status: RequestStatus.Idle,
  error: null,
};

type ThunkConfig = { rejectValue: ApiErrorCode; state: RootState };

export const fetchUsers = createAsyncThunk<User[], void, ThunkConfig>(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await usersService.getUsers();
    } catch (error) {
      return rejectWithValue(toApiErrorCode(error));
    }
  },
  {
    // Skips a second request while one is in flight (e.g. StrictMode double effects).
    condition: (_, { getState }) => getState().users.status !== RequestStatus.Loading,
  },
);

export const createUser = createAsyncThunk<User, CreateUserPayload, ThunkConfig>(
  'users/create',
  async (payload, { rejectWithValue }) => {
    try {
      return await usersService.createUser(payload);
    } catch (error) {
      return rejectWithValue(toApiErrorCode(error));
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.payload ?? ApiErrorCode.Unknown;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        // The mock API returns the same id for every POST, so ids are kept unique locally.
        const isTaken = state.items.some((item) => item.id === action.payload.id);
        const id = isTaken ? getNextId(state.items) : action.payload.id;

        state.items.unshift({ ...action.payload, id });
      });
  },
});

export const usersReducer = usersSlice.reducer;

export const selectUsers = (state: RootState): User[] => state.users.items;
export const selectUsersStatus = (state: RootState): RequestStatus => state.users.status;
export const selectUsersError = (state: RootState): ApiErrorCode | null => state.users.error;
