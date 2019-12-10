import { ContainerState, ContainerActions } from './types';
import ActionTypes from './constants';
import auth from '../../utils/auth';
import { stat } from 'fs';

// The initial state of the App
export const initialState: ContainerState = {
  loading: false,
  error: false,
  currentUser: '',
  userData: {
    repos: [],
  },
  formState: {
    username: '',
    password: '',
  },
  currentlySending: false,
  loggedIn: auth.loggedIn(),
  errorMessage: '',
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function appReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.LOAD_REPOS:
      return {
        currentUser: state.currentUser,
        loading: true,
        error: false,
        userData: {
          repos: [],
        },
        formState: state.formState,
        currentlySending: state.currentlySending,
        loggedIn: state.loggedIn,
        errorMessage: state.errorMessage,
      };
    case ActionTypes.LOAD_REPOS_SUCCESS:
      return {
        currentUser: action.payload.username,
        loading: false,
        error: state.error,
        userData: {
          repos: action.payload.repos,
        },
        formState: state.formState,
        currentlySending: state.currentlySending,
        loggedIn: state.loggedIn,
        errorMessage: state.errorMessage,
      };
    case ActionTypes.LOAD_REPOS_ERROR:
      const { error, loading, ...rest } = state;
      return {
          error: action.payload,
          loading: false,
          ...rest,
      };
    case ActionTypes.LOGIN:
        return {
            ...state,
            formState: action.payload,
        };
    case ActionTypes.SENDING_REQUEST:
        return {
            ...state,
            currentlySending: action.payload,
        };
    case ActionTypes.SIGNUP:
        return {
            ...state,
            formState: action.payload,
        };
    case ActionTypes.SET_AUTH:
        return {
          ...state,
          loggedIn: action.payload,
        };
    case ActionTypes.SET_ERROR_MESSAGE:
        return {
            ...state,
            errorMessage: action.payload,
        };
    case ActionTypes.LOGOUT:
        return {
          ...state,
          formState: {username: '', password: ''},
        };
    case ActionTypes.CHANGE_FORM:
        return {
          ...state,
          formState: action.payload,
        };
    default:
      return state;
  }
}

export default appReducer;
