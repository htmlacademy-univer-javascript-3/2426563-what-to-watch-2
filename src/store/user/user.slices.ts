import {createSlice} from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../data/enums/authorization-status';
import { NameSpace } from '../../data/constants/name-space';
import { checkAuthAction, loginAction, logoutAction } from '../api-action';

export type InitialState = {
  authorizationStatus: AuthorizationStatus;
  hasError: boolean;
  name: string | null;
  avatarUrl: string | null;
}

export const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  name: null,
  avatarUrl: null,
  hasError: false
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.name = action.payload.name;
        state.avatarUrl = action.payload.avatarUrl;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.name = null;
        state.avatarUrl = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.hasError = false;
        state.name = action.payload.name;
        state.avatarUrl = action.payload.avatarUrl;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.hasError = true;
        state.avatarUrl = null;
        state.name = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.hasError = false;
        state.avatarUrl = null;
        state.name = null;
      });
  }
});
