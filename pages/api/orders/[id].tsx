import type { NextApiResponse } from 'next';

import { apiHandler } from 'src/helpers/api';
import { orderDatabase } from 'src/database/order';
import { IOrder, IReqWithUser } from '../../../src/models';

export default apiHandler(ordersHandler);

async function ordersHandler(
  req: IReqWithUser,
  res: NextApiResponse<
    IOrder | IOrder[] | { result?: boolean; message?: string }
  >
) {
  const {
    query: { id },
    method,
    user,
    body,
  } = req;

  let result;

  switch (method) {
    case 'GET':
      const order = await orderDatabase.getOrderById(Number(id));
      const items = await orderDatabase.getLinkedProductsById(Number(id));
      const user1 = await orderDatabase.getLinkedUserById(Number(id));
    

      if (order && items && user1) {
        return res
          .status(200)
          .json({ ...order, items, id_user: user1[0].id_user });
      } else {
        return res.status(500).json({ message: 'Error' });
      }

    case 'PUT':
      if (!user || user.role !== 'admin')
      return res.status(400).json({ message: 'Only for admin' });

      result = await orderDatabase.editOrderById(Number(id), {
        ...body.order,
      });

      if (result) {
        return res.status(200).json({ result: true });
      } else {
        return res.status(500).json({ result: false, message: 'Error' });
      }

    case 'DELETE':
      console.log(user)
      if (!user || user.role !== 'admin')
      return res.status(400).json({ message: 'Only for admin' });

      await orderDatabase.deleteOrdersLinkedProductsById(Number(id));
      await orderDatabase.deleteOrdersLinkedUsersById(Number(id));
      result = await orderDatabase.deleteOrderById(Number(id));

      // TODO add removing from FirebaseAuth

      if (result) {
        return res.status(200).json(result);
      } else {
        return res.status(500).json({ message: 'Error' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
