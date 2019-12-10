import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { Repo } from '../RepoListItem/types';
import { ApplicationRootState } from '../../types';

/* --- STATE --- */

interface AppState {
  readonly loading: boolean;
  readonly error?: object | boolean;
  readonly currentUser: string;
  readonly userData: UserData;
  formState: FormState;
  currentlySending: boolean;
  loggedIn: boolean;
  errorMessage: string;
}

interface UserData {
  readonly repos?: Repo[];
}

interface FormState {
  username?: string;
  password?: string;
}


/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;


/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = AppState;
type ContainerActions = AppActions;

export { RootState, ContainerState, ContainerActions, UserData, FormState };
