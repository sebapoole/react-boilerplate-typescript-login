/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 */

enum ActionTypes {
  LOAD_REPOS = 'boilerplate/App/LOAD_REPOS',
  LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS',
  LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR',
  SENDING_REQUEST = 'boilerplate/App/SENDING_REQUEST',
  LOGIN = 'boilerplate/App/LOGIN',
  SIGNUP = 'boilerplate/App/SIGNUP',
  SET_AUTH = 'boilerplate/App/SET_AUTH',
  SET_ERROR_MESSAGE = 'boilerplate/App/SET_ERROR_MESSAGE',
  LOGOUT = 'boilerplate/App/LOGOUT',
  CHANGE_FORM = 'boilerplate/App/CHANGE_FORM',
}

export default ActionTypes;
