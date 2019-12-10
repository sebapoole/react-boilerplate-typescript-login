/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';

const selectGlobal = (state: ApplicationRootState) => {
  return state.global;
};

const selectRoute = (state: ApplicationRootState) => {
  return state.router;
};

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, globalState => globalState.currentUser);

const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.loading);

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.error);

const makeSelectRepos = () =>
  createSelector(selectGlobal, globalState =>
    globalState.userData.repos);

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.location);

const makeSelectErrorMessage = () =>
  createSelector(selectGlobal, globalState => globalState.errorMessage);

const makeSelectCurrentlySending = () =>
  createSelector(selectGlobal, globalState => globalState.currentlySending);

const makeSelectAuth = () =>
  createSelector(selectGlobal, globalState => globalState.loggedIn);

const makeSelectFormState = () =>
  createSelector(selectGlobal, globalState => {
    return globalState.formState;
  });

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectErrorMessage,
  makeSelectFormState,
  makeSelectAuth,
  makeSelectCurrentlySending,
};
