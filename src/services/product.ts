import getConfig from 'next/config';

import { fetchWrapper } from '../helpers';
import { ICategory, IProduct } from 'src/models';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/products`;

export const productService = {
  getAll,
  getById,
  edit,
  create,
  delete: _delete,
};

function getAll(categories?:string, prices?:string) {
  return fetchWrapper.get(`${baseUrl}?categories=${categories}&prices=${prices}`);
}

function getById(id: string) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function edit(product: IProduct) {
  return fetchWrapper.put(`${baseUrl}/${product.id}`, { product });
}

function create(product: IProduct) {
  return fetchWrapper.postMultipart(`${baseUrl}`, product);
}

function _delete(id: string) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
