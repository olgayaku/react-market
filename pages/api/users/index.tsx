import type { NextApiResponse } from 'next';

import { apiHandler } from 'src/helpers/api';
import { userDatabase } from 'src/database/user';
import { IReqWithUser, IUser } from '../../../src/models';

export default apiHandler(usersHandler);

async function usersHandler(
  req: IReqWithUser,
  res: NextApiResponse<IUser | IUser[] | { result?: boolean; message?: string }>
) {
  const { method, body, user } = req;

  if (!user || user.role !== 'admin')
    return res.status(400).json({ message: 'Only for admin' });

  switch (method) {
    case 'GET':
      const users = await userDatabase.getUsers();

      if (users) {
        return res.status(200).json(users);
      } else {
        return res.status(500);
      }

      break;
    case 'POST':
      // Update or create data in your database
      const result = await userDatabase.createUser({ ...body.user });

      if (result) {
        return res.status(200).json(result as IUser);
      } else {
        return res.status(500).json({ result: false, message: 'Error' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
