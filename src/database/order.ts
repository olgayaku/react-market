import { IOrder, IUser, IProduct } from 'src/models';
import excuteQuery from './db';

export const orderDatabase = {
  getOrders,
  getOrderById,
  getOrderByUserId,
  getLinkedUserById,
  getLinkedProductsById,
  createOrder,
  linkUser,
  linkProduct,
  editOrderById,
  deleteOrderById,
  deleteOrdersLinkedUsersById,
  deleteOrdersLinkedProductsById
};

async function getOrders(): Promise<IOrder[] | null | undefined> {
  try {
    let excute = await excuteQuery<IOrder[]>({
      query: 'SELECT * FROM orders',
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}
async function getOrderById(
  id: number
): Promise<IOrder | null | undefined> {
  try {
    let excute = await excuteQuery<IOrder[]>({
      query: 'SELECT * FROM orders where id=?',
      values: [id],
    });

    return excute.res?.[0] ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function getOrderByUserId(
  id_user: number
): Promise<IOrder[] | null | undefined> {
  try {
    let excute = await excuteQuery<IOrder[]>({
      query: `SELECT * 
      FROM orders
      INNER JOIN order_users
      WHERE order_users.id_user = ? and orders.id = order_users.id_order`,
      values: [id_user],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function getLinkedUserById(
  id: number
): Promise<IUser[] | null | undefined> {
  try {
    let excute = await excuteQuery<IUser[]>({
      query: `SELECT id_user, email, name, surname, middle_name 
      FROM orders
      INNER JOIN order_users
      INNER JOIN users
      WHERE order_users.id_order = orders.id and order_users.id_user = users.id and orders.id = ?`,
      values: [id],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function getLinkedProductsById(
  id: number
): Promise<IProduct[] | null | undefined> {
  try {
    let excute = await excuteQuery<IProduct[]>({
      query: `SELECT id_product, count, name, description, products.price, img 
      FROM orders
      INNER JOIN orders_products
      INNER JOIN products
      WHERE orders_products.id_order = orders.id and orders_products.id_product = products.id and orders.id = ?`,
      values: [id],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function createOrder({ create_time, status, price, comment }: IOrder) {
  try {
    const excuteOrder = await excuteQuery({
      query: 'INSERT INTO orders (create_time, status, price, comment ) VALUES(?, ?, ?, ?)',
      values: [create_time, 0, price, comment],
    });

    const excuteId = await excuteQuery<IOrder[]>({
      query: 'SELECT LAST_INSERT_ID() as id',
    });

    return excuteOrder?.res && excuteId ? excuteId?.res?.[0].id : null;
  } catch (error) {
    console.log(error);
  }
}

async function linkUser(idOrder: number, idUser: string) {
  try {
    const excute = await excuteQuery({
      query:
        'INSERT INTO order_users (id_user, id_order) VALUES(?, ?)',
      values: [idUser, idOrder],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function linkProduct(idOrder: number, idProduct: string, count: number) {
  try {
    const excute = await excuteQuery({
      query:
        'INSERT INTO orders_products (id_order, id_product, count) VALUES(?, ?, ?)',
      values: [idOrder, idProduct, count],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function editOrderById(id: number, { status }: IOrder) {
  try {
    const excute = await excuteQuery({
      query: `UPDATE orders SET status = ? WHERE (id = ?)`,
      values: [status, id],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function deleteOrderById(id: number): Promise<any | null> {
  try {
    let excute = await excuteQuery({
      query: 'DELETE FROM orders where id=?',
      values: [id],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}
async function deleteOrdersLinkedUsersById(id: number): Promise<any | null> {
  try {
    let excute = await excuteQuery({
      query: 'DELETE FROM order_users where id_order=?',
      values: [id],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}
async function deleteOrdersLinkedProductsById(id: number): Promise<any | null> {
  try {
    let excute = await excuteQuery({
      query: 'DELETE FROM orders_products where id_order=?',
      values: [id],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}
