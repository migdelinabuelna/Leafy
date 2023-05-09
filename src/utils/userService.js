import tokenService from './tokenService';

const BASE_URL = '/api/users/'; //sign up request comes in through here
//we are sending over a file through our sign up, therefore we need to send over a multipart/form-data request
//the browser will automatically detect that for us and apply the headers

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    // headers: new Headers({'Content-Type': 'application/json'}),  // If you are sending a file/photo over
    // what do datatype do you need to change this too?
    // body: JSON.stringify(user)
    body: user // < - no need stringify the user data because we're not sending over json we are sending over form/data
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('EMAIL OR USERNAME IS ALREADY TAKEN!');
  })
  // Parameter destructuring!
  .then(({token}) => tokenService.setToken(token)); //this is where we store our token in local storage
  // The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  }) //after we ger the response form the express server, we get the token that was just created and we set it in local storage
  .then(({token}) => tokenService.setToken(token));
}

export default {
  signup, 
  getUser,
  logout,
  login
};