import type { NextApiResponse } from 'next';

import * as formidable from 'formidable';
import { IncomingForm } from 'formidable';
import fs, { promises } from 'fs';

import { apiHandler } from 'src/helpers/api';
import { productDatabase } from 'src/database/product';
import { IReqWithUser, IProduct } from '../../../src/models';
import { imageDatabase } from 'src/database/image';
import { categoryDatabase } from 'src/database/category';

export default apiHandler(productsHandler);

export const config = {
  api: {
    bodyParser: false,
  },
};

async function productsHandler(
  req: IReqWithUser,
  res: NextApiResponse<
    IProduct | IProduct[] | { result?: boolean; message?: string }
  >
) {
  const {
    method,
    body,
    user,
    query: { categories, prices },
  } = req;

  if (method !== 'GET') {
    if (!user || user.role !== 'admin')
      return res.status(400).json({ message: 'Only for admin' });
  }

  let result;

  switch (method) {
    case 'GET':
      let products = await productDatabase.getProducts();

      products = await Promise.all(
        products.map(async (p) => {
          let categories = await categoryDatabase.getLinkedCategoriesById(p.id);
          return { ...p, categories };
        })
      );

      if (categories !== 'undefined') {
        products = filterByCategories(products, categories);
      }

      if (prices !== 'undefined') {
        products = filterByPrices(products, prices);
      }

      if (products) {
        return res.status(200).json(products);
      } else {
        return res.status(500);
      }

    case 'POST':
      // parse form with a Promise wrapper
      const data = await new Promise<{
        fields: formidable.Fields;
        files: formidable.Files;
      }>((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });

      const { fields, files } = data;

      // create default product
      const id = await productDatabase.createProduct(fields);

      // upload images
      try {
        const imagesPath = [];

        for (let key in files) {
          const file = files[key]; // .image because I named it in client side by that name: // pictureData.append('image', pictureFile);
          const name = file.originalFilename;
          const imagePath = file.filepath;
          const rootDir = 'public';

          if (!fs.existsSync(`${rootDir}/products/${id}`)) {
            fs.mkdirSync(`${rootDir}/products/${id}`);
          }
          const pathToWriteImage = `/products/${id}/${name}`; // include name and .extention, you can get the name from data.files.image object
          imagesPath.push(pathToWriteImage);
          const image = await promises.readFile(imagePath);
          await promises.writeFile(`${rootDir}${pathToWriteImage}`, image);
        }

        // take 1 image like product preview
        const img = imagesPath.shift();
        result = await productDatabase.updateImgProductById(id, { img });

        // save other images and link to product
        for (let val of imagesPath) {
          await imageDatabase.createImage(id, val);
        }

        // link categories to product
        for (let key in fields) {
          if (key.includes('categories')) {
            await categoryDatabase.linkCategory(id, fields[key]);
          }
        }

        //store path in DB
        res.status(200).json({ message: 'image uploaded!', result });
      } catch (error) {
        res.status(500).json({ message: error.message });
        return;
      }

      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function filterByCategories(items: IProduct[], filter: string) {
  // filter: 1, 2, 3, 4
  let categories = filter.split(',');
  categories = categories.map(e => e.toLocaleLowerCase())

  return items.filter(
    (e) =>
      e.categories.filter((c) => categories.includes(c.toLocaleLowerCase()))
        .length > 0
  );
}

function filterByPrices(items: IProduct[], filter: string) {
  // filter: 1-2, 3-4, 5-6, 7-8
  let prices = filter.split(',');
  let pricesRange = prices.map((e) => e.split('-'));

  return items.filter(({ price }) =>
    pricesRange.some(([p1, p2]) => price >= Number(p1) && price <= Number(p2))
  );
}
