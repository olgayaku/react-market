import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';

import { fetchWrapper } from '../helpers';
import { ICategory } from 'src/models';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/categories`;

export const categoryService = {
  getAll,
  getById,
  edit,
  create,
  delete: _delete,
};

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id: string) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function edit(category: ICategory) {
  return fetchWrapper.put(`${baseUrl}/${category.id}`, { category });
}

function create(category: ICategory) {
  return fetchWrapper.post(`${baseUrl}`, { category });
}

function _delete(id: string) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
