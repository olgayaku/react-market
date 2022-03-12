import type { NextApiResponse } from 'next';

import { apiHandler } from 'src/helpers/api';
import { orderDatabase } from 'src/database/order';
import { IReqWithUser, IOrder } from '../../../src/models';

export default apiHandler(ordersHandler);

async function ordersHandler(
  req: IReqWithUser,
  res: NextApiResponse<
    IOrder | IOrder[] | { result?: boolean; message?: string }
  >
) {
  const {
    method,
    body,
    user,
    query: { user_id },
  } = req;


  let result, orders;

  switch (method) {
    case 'GET':
      if (user_id) {
        orders = await orderDatabase.getOrderByUserId(Number(user_id));
      } else {
        if (!user || user.role !== 'admin')
        return res.status(400).json({ message: 'Only for admin' });
        orders = await orderDatabase.getOrders();
      }


      if (orders) {
        return res.status(200).json(orders);
      } else {
        return res.status(500);
      }

    case 'POST':
     

      let id = await orderDatabase.createOrder({
        ...body.order,
      });

      console.log('id :>> ', id);

      for (const val of body.order.items) {
        await orderDatabase.linkProduct(Number(id), val.id, val.count);
      }

      result = await orderDatabase.linkUser(Number(id), body.order.id_user);

      if (result) {
        return res.status(200).json({ result: true });
      } else {
        return res.status(500).json({ result: false, message: 'Error' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
