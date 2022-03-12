import type { NextApiRequest } from 'next';

export enum RoleType {
  USER = 'user',
  ADMIN = 'admin',
}

export interface IUser {
  id?: number;
  email: string;
  uid: string;
  name: string;
  surname?: string | null;
  middle_name?: string | null;
  role: RoleType;
}

export interface IReqWithUser extends NextApiRequest {
  user?: IUser;
}

export interface ICategory {
  id?: number;
  name: string;
}

export interface IImage {
  id?: number;
  name: string;
}

export interface IProduct {
  // initial
  id?: number;
  name: string;
  description: string;
  price: number;
  img?: string | null;
  type?: 'shoper' | 'page';

  // dynamic
  gallery: string[];
  categories: string[];

  // redux
  count?: number;
}

export interface IOrder {
  // initial
  id?: number;
  id_user?: number;
  create_time: number;
  price: number;
  status?: string;
  comment?: string | null;

  // dynamic
  items: IProduct[];

  // redux
  count?: number;
}
