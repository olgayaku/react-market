import type { NextApiResponse } from 'next';

import { apiHandler } from 'src/helpers/api';
import { categoryDatabase } from 'src/database/category';
import { ICategory, IReqWithUser } from '../../../src/models';

export default apiHandler(categoriesHandler);

async function categoriesHandler(
  req: IReqWithUser,
  res: NextApiResponse<
    ICategory | ICategory[] | { result?: boolean; message?: string }
  >
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
      const category = await categoryDatabase.getCategoryById(Number(id));

      if (category) {
        return res.status(200).json(category);
      } else {
        return res.status(500).json({ message: 'Error' });
      }
      
    case 'PUT':
      result = await categoryDatabase.editCategoryById(Number(id), { ...body.category });

      if (result) {
        return res.status(200).json({ result: true });
      } else {
        return res.status(500).json({ result: false, message: 'Error' });
      }

    case 'DELETE':
      result = await categoryDatabase.deleteCategoryById(Number(id));

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
