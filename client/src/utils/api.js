import {store} from '../index';

const Config = {
  development: {
      'apiUrl': 'http://localhost:5000/'
  },
  production:  {
      'apiUrl': 'fromAssesToTorses'
  }
};

export const getConfig = () => process.env.NODE_ENV === 'production' ? Config.production : Config.development;


const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
};

const getRequestInfo = (url) => (`${getConfig().apiUrl}${url}`);

const getAuthorizationToken = () => {
  const { activeUser } = store.getState().account;

  return activeUser && activeUser.token;
};

const init = (method) => {
  return {
    method,
    headers: new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };
};

const getRequestInit = (queryOrBody, method) => {
  let requestInit = init(method);

  if (method === 'GET') {
    requestInit.query = JSON.stringify(queryOrBody);
  } else {
    requestInit.body = JSON.stringify(queryOrBody);
  }

  const token = getAuthorizationToken();

  token && requestInit.headers.append('Authorization',`Bearer ${token}`);

  return requestInit;
};

const Api = {
  get: (url, query = {}) => (
    fetch(getRequestInfo(url), getRequestInit(query, 'GET'))
      .then(handleErrors)
      .then(response => response.json())
  ),
  post: (url, body = {}) => (
    fetch(getRequestInfo(url), getRequestInit(body, 'POST'))
      .then(handleErrors)
      .then(response => response.json())
  )
};

export default Api;
