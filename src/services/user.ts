import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from '../helpers';
import { IUser } from 'src/models';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(
  process.browser && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  register,
  logout,
  getAll,
  getById,
  edit,
  create,
  delete: _delete,
};

function login(email: string, uid: string) {
  return fetchWrapper
    .post(`${baseUrl}/authenticate`, { email, uid })
    .then((user) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      userSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function register(user: IUser) {
  return fetchWrapper
    .post(`${baseUrl}/register`, { user })
    .then((user) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      userSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem('user');
  userSubject.next(null);
  Router.push('/login');
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id: string) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function edit(user: IUser) {
  return fetchWrapper.put(`${baseUrl}/${user.id}`, { user });
}

function create(user: IUser) {
  return fetchWrapper.post(`${baseUrl}`, { user });
}

function _delete(id: string) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
