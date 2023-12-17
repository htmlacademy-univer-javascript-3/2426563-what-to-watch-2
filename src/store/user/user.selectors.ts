import { NameSpace } from '../../data/constants/name-space';
import { AuthorizationStatus } from '../../data/enums/authorization-status';
import { State } from '../../data/types/store';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;
export const getAuthHasError = (state: State): boolean => state[NameSpace.User].hasError;
export const getUserAvatarUrl = (state: State): string | null => state[NameSpace.User].avatarUrl;
export const getUserName = (state: State): string | null => state[NameSpace.User].name;
