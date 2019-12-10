import { action, createCustomAction } from 'typesafe-actions';

import ActionTypes from './constants';
import { Repo } from '../RepoListItem/types';
import { FormState } from './types';
import LoginPage from 'containers/LoginPage';

export const loadRepos = () => action(ActionTypes.LOAD_REPOS);

export const reposLoaded = (repos: Repo[], username: string) =>
  action(ActionTypes.LOAD_REPOS_SUCCESS, { repos: repos, username: username });

export const repoLoadingError = (error: object) =>
  action(ActionTypes.LOAD_REPOS_ERROR, error);

export const sendingRequest = createCustomAction(ActionTypes.SENDING_REQUEST, type => {
  return (payload: boolean) => ({type, payload});
});

export const login = (formData: FormState) =>
  action(ActionTypes.LOGIN, formData);

export const signUp = (formData: FormState) =>
  action(ActionTypes.SIGNUP, formData);

export const setAuthState = (newState: boolean) =>
  action(ActionTypes.SET_AUTH, newState);

export const setErrorMessage = (message: string) =>
  action(ActionTypes.SET_ERROR_MESSAGE, message);

export const logout = () =>
  action(ActionTypes.LOGOUT);

export const changeForm = (formData: FormState) =>
  action(ActionTypes.CHANGE_FORM, formData);
