import getConfig from 'next/config';

import { fetchWrapper } from '../helpers';
import { IOrder } from 'src/models';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/orders`;

export const orderService = {
  getAll,
  getById,
  getByUserId,
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

function getByUserId(user_id: string) {
  return fetchWrapper.get(`${baseUrl}?user_id=${user_id}`);
}

function edit(order: IOrder) {
  return fetchWrapper.put(`${baseUrl}/${order.id}`, { order });
}

function create(order: IOrder) {
  return fetchWrapper.post(`${baseUrl}`, { order });
}

function _delete(id: string) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
