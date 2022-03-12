import { IImage } from 'src/models';
import excuteQuery from './db';

export const imageDatabase = {
  createImage,
  getLinkedImagesById,
  deleteLinkedImagesById,
  deleteImagesByName,
};

// async function getImageById(
//   id: number
// ): Promise<IImage | null | undefined> {
//   try {
//     let excute = await excuteQuery<IImage[]>({
//       query: 'SELECT * FROM img where id=?',
//       values: [id],
//     });

//     return excute.res?.[0] ?? null;
//   } catch (error) {
//     console.log(error);
//   }
// }

async function getLinkedImagesById(
  id: number
): Promise<string[] | null | undefined> {
  try {
    let excute = await excuteQuery<IImage[]>({
      query: `SELECT img.name
      FROM products 
      INNER JOIN img
      INNER JOIN img_products
      WHERE products.id = ? and products.id = img_products.id_product and img_products.id_img = img.id`,
      values: [id],
    });

    return excute?.res?.reduce((acc, e) => [...acc, e.name], []) ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function createImage(idProduct: number, src: String) {
  try {
    const excuteInsert = await excuteQuery({
      query: 'INSERT INTO img (name) VALUES(?)',
      values: [src],
    });

    const excuteImageId = await excuteQuery<IImage[]>({
      query: 'SELECT LAST_INSERT_ID() as id',
    });

    const excuteInsert2 = await excuteQuery({
      query: 'INSERT INTO img_products (id_img, id_product) VALUES(?, ?)',
      values: [excuteImageId.res?.[0].id, idProduct],
    });
    

    return excuteInsert2?.res ? excuteInsert2?.res : null;
  } catch (error) {
    console.log(error);
  }
}

async function deleteLinkedImagesById(id: number): Promise<any | null> {
  try {
    let excute = await excuteQuery({
      query: 'DELETE FROM img_products where id_product=?',
      values: [id],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function deleteImagesByName(name: string): Promise<any | null> {
  try {
    let excute = await excuteQuery({
      query: 'DELETE FROM img where name=?',
      values: [name],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}
