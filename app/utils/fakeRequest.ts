import server from './fakeServer';
// Fake XMLHttpRequest wrapper with a syntax similar to the much used request.js

interface DataObject {
  username: string;
  password: string;
}

const fakeRequest = {
  // Pretends to post to a remote server
  post(endpoint: string, data?: DataObject) { // eslint-disable-line consistent-return
    switch (endpoint) {
      case '/login': {
        return server.login(data!.username, data!.password);
      }
      case '/signup':
        return server.signup(data!.username, data!.password);
      case '/logout':
        return server.logout();
      default:
        return undefined;
    }
  },
};

export default fakeRequest;
