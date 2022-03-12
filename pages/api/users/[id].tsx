import type { NextApiResponse } from 'next';

import { apiHandler } from 'src/helpers/api';
import { userDatabase } from 'src/database/user';
import { IReqWithUser, IUser } from '../../../src/models';

export default apiHandler(userHandler);

async function userHandler(
  req: IReqWithUser,
  res: NextApiResponse<IUser | IUser[] | { result?: boolean; message?: string }>
) {
  const {
    query: { id },
    method,
    user,
    body,
  } = req;

  if (!user || user.role !== 'admin')
    return res.status(400).json({ message: 'Only for admin' });

  let result;

  switch (method) {
    case 'GET':
      const user = await userDatabase.getUserByID(Number(id));

      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(500).json({ message: 'Error' });
      }
    case 'PUT':
      result = await userDatabase.editUserByID(Number(id), { ...body.user });

      if (result) {
        return res.status(200).json({ result: true });
      } else {
        return res.status(500).json({ result: false, message: 'Error' });
      }
      break;
    case 'DELETE':
      result = await userDatabase.deleteUserByID(Number(id));

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
