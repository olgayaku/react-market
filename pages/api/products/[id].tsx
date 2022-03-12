import type { NextApiResponse } from 'next';

let fs = require('fs');

import { apiHandler } from 'src/helpers/api';
import { categoryDatabase } from 'src/database/category';
import { IProduct, IReqWithUser } from '../../../src/models';
import { productDatabase } from 'src/database/product';
import { imageDatabase } from 'src/database/image';

export default apiHandler(productsHandler);

function deleteFolder(path: string) {
  let files = [];
  if (fs.existsSync('public/' + path)) {
    files = fs.readdirSync('public/' + path);
    files.forEach(async function (file: File, index: number) {
      let curPath = 'public/' + path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
        await imageDatabase.deleteImagesByName(path + '/' + file);
      }
    });
    fs.rmdirSync('public/' + path);
  }
}

async function productsHandler(
  req: IReqWithUser,
  res: NextApiResponse<
    IProduct | IProduct[] | { result?: boolean; message?: string }
  >
) {
  const {
    query: { id },
    method,
    user,
    body,
  } = req;

  if (method !== 'GET') {
    if (!user || user.role !== 'admin')
      return res.status(400).json({ message: 'Only for admin' });
  }

  let result, gallery;

  switch (method) {
    case 'GET':
      const product = await productDatabase.getProductById(Number(id));
      const categories = await categoryDatabase.getLinkedCategoriesById(
        Number(id)
      );
      gallery = await imageDatabase.getLinkedImagesById(Number(id));

      if (product && gallery && categories) {
        return res.status(200).json({ ...product, categories, gallery });
      } else {
        return res.status(500).json({ message: 'Error' });
      }

    case 'PUT':
      await categoryDatabase.deleteLinkedCategoryById(Number(id));

      result = await productDatabase.editProductById(Number(id), {
        ...body.product,
      });

      for (let val of body.product.categories) {
        await categoryDatabase.linkCategory(id, val);
      }

      if (result) {
        return res.status(200).json({ result: true });
      } else {
        return res.status(500).json({ result: false, message: 'Error' });
      }

    case 'DELETE':
      await deleteFolder(`/products/${id}`);

      await categoryDatabase.deleteLinkedCategoryById(Number(id));
      await imageDatabase.deleteLinkedImagesById(Number(id));

      result = await productDatabase.deleteProductById(Number(id));

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
