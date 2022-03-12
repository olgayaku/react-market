import type { NextApiResponse } from 'next';

import { apiHandler } from 'src/helpers/api';
import { categoryDatabase } from 'src/database/category';
import { IReqWithUser, ICategory } from '../../../src/models';

export default apiHandler(categoriesHandler);

async function categoriesHandler(
  req: IReqWithUser,
  res: NextApiResponse<
    ICategory | ICategory[] | { result?: boolean; message?: string }
  >
) {
  const { method, body, user } = req;

  if (!user || user.role !== 'admin')
    return res.status(400).json({ message: 'Only for admin' });

  switch (method) {
    case 'GET':
      const categories = await categoryDatabase.getCategories();

      if (categories) {
        return res.status(200).json(categories);
      } else {
        return res.status(500);
      }

    case 'POST':
      const result = await categoryDatabase.createCategory({
        ...body.category,
      });

      if (result) {
        return res.status(200).json(result as ICategory);
      } else {
        return res.status(500).json({ result: false, message: 'Error' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
