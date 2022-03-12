import { IProduct } from 'src/models';
import excuteQuery from './db';

export const productDatabase = {
  getProducts,
  createProduct,
  getProductById,
  editProductById,
  updateImgProductById,
  deleteProductById,
};

async function getProducts(): Promise<IProduct[] | null | undefined> {
  try {
    let excute = await excuteQuery<IProduct[]>({
      query: 'SELECT * FROM products',
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function createProduct({ name, description, price, img = null }: IProduct) {
  try {
    const excuteProduct = await excuteQuery({
      query: 'INSERT INTO products (name, description, price, img ) VALUES(?, ?, ?, ?)',
      values: [name, description, price, img],
    });

    const excuteId = await excuteQuery<IProduct[]>({
      query: 'SELECT LAST_INSERT_ID() as id',
    });

    return excuteProduct?.res && excuteId ? excuteId?.res?.[0].id : null;
  } catch (error) {
    console.log(error);
  }
}

async function getProductById(
  id: number
): Promise<IProduct | null | undefined> {
  try {
    let excute = await excuteQuery<IProduct[]>({
      query: 'SELECT * FROM products where id=?',
      values: [id],
    });

    return excute.res?.[0] ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function updateImgProductById(id: number, { img }: IProduct) {
  try {
    const excute = await excuteQuery({
      query: `UPDATE products SET img = ? WHERE (id = ?)`,
      values: [img, id],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function editProductById(id: number, { name, description, price }: IProduct) {
  try {
    const excute = await excuteQuery({
      query: `UPDATE products SET name = ?, description = ?, price = ? WHERE (id = ?)`,
      values: [name, description, price, id],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function deleteProductById(id: number): Promise<any | null> {
  try {
    let excuteCategories = await excuteQuery({
      query: 'DELETE FROM categories_products where id_product=?',
      values: [id],
    });

    let excute = await excuteQuery({
      query: 'DELETE FROM products where id=?',
      values: [id],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}
