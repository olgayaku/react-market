import { ICategory } from 'src/models';
import excuteQuery from './db';

export const categoryDatabase = {
  getCategories,
  createCategory,
  getCategoryById,
  editCategoryById,
  deleteCategoryById,
  linkCategory,
  getLinkedCategoriesById,
  deleteLinkedCategoryById
};

async function getCategories(): Promise<ICategory[] | null | undefined> {
  try {
    let excute = await excuteQuery<ICategory[]>({
      query: 'SELECT * FROM categories',
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}
async function createCategory({ name }: ICategory) {
  try {
    const excute = await excuteQuery({
      query: 'INSERT INTO categories (name) VALUES(?)',
      values: [name],
    });

    const excuteId = await excuteQuery<ICategory[]>({
      query: 'SELECT LAST_INSERT_ID() as id',
    });

    return excute?.res && excuteId ? excuteId?.res?.[0] : null;
  } catch (error) {
    console.log(error);
  }
}

async function getCategoryById(
  id: number
): Promise<ICategory | null | undefined> {
  try {
    let excute = await excuteQuery<ICategory[]>({
      query: 'SELECT * FROM categories where id=?',
      values: [id],
    });

    return excute.res?.[0] ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function getLinkedCategoriesById(
  id: number
): Promise<string[] | null | undefined> {
  try {
    let excute = await excuteQuery<ICategory[]>({
      query: `SELECT categories.name
      FROM products 
      INNER JOIN categories
      INNER JOIN categories_products
      WHERE products.id = ? and products.id = categories_products.id_product and categories_products.id_category = categories.id`,
      values: [id],
    });

    return excute?.res?.reduce((acc, e) => [...acc, e.name], []) ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function getCategoryByName(
  name: string
): Promise<ICategory | null | undefined> {
  try {
    let excute = await excuteQuery<ICategory[]>({
      query: 'SELECT * FROM categories where name=?',
      values: [name],
    });

    return excute.res?.[0] ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function editCategoryById(id: number, { name }: ICategory) {
  try {
    const excute = await excuteQuery({
      query: `UPDATE categories SET name = ? WHERE (id = ?)`,
      values: [name, id],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function linkCategory(idProduct: number, name: string) {
  try {
    const { id: idCategory } = await getCategoryByName(name);

    const excute = await excuteQuery({
      query:
        'INSERT INTO categories_products (id_category, id_product) VALUES(?, ?)',
      values: [idCategory, idProduct],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function deleteCategoryById(id: number): Promise<any | null> {
  try {
    let excute = await excuteQuery({
      query: 'DELETE FROM categories where id=?',
      values: [id],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function deleteLinkedCategoryById(id: number): Promise<any | null> {
  try {
    let excute = await excuteQuery({
      query: 'DELETE FROM categories_products where id_product=?',
      values: [id],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}
