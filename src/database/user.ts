import { IUser, RoleType } from "src/models";
import excuteQuery from "./db";

export const userDatabase = {
  getUsers,
  getUserByID,
  createUser,
  editUserByID,
  deleteUserByID,
};

async function getUsers(): Promise<IUser[] | null | undefined> {
  try {
    let excute = await excuteQuery<IUser[]>({
      query: 'SELECT * FROM users',
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function getUserByID(
  id: number
): Promise<IUser | null | undefined> {
  try {
    let excute = await excuteQuery<IUser[]>({
      query: 'SELECT * FROM users where id=?',
      values: [id],
    });

    return excute.res?.[0] ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function createUser({
  email,
  uid,
  name,
  surname,
  middle_name = null,
  role = RoleType.USER,
}: IUser) {
  const user = {
    email,
    name,
    surname,
    uid,
    middle_name,
    role,
  };

  try {
    const excute = await excuteQuery({
      query:
        'INSERT INTO users (email, uid, name, surname, middle_name, role) VALUES(?, ?, ?, ?, ?, ?)',
      values: [
        user.email,
        user.uid,
        user.name,
        user.surname,
        user.middle_name,
        user.role,
      ],
    });

    const excuteId = await excuteQuery<IUser[]>({
      query: 'SELECT LAST_INSERT_ID() as id',
    });

    return excute?.res && excuteId ? excuteId?.res?.[0] : null;
  } catch (error) {
    console.log(error);
  }
}

async function editUserByID(
  id: number,
  {
    email,
    uid = '',
    name,
    surname,
    middle_name = null,
    role = RoleType.USER,
  }: IUser
) {
  const user = {
    email,
    name,
    surname,
    uid,
    middle_name,
    role,
  };

  try {
    const excute = await excuteQuery({
      query: `UPDATE users SET email = ?, uid = ?, name = ?, surname = ?, middle_name = ?, role = ? WHERE (id = ?)`,
      values: [
        user.email,
        user.uid,
        user.name,
        user.surname,
        user.middle_name,
        user.role,
        id,
      ],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}

async function deleteUserByID(
  id: number
): Promise<any | null> {
  try {
    let excute = await excuteQuery({
      query: 'DELETE FROM users where id=?',
      values: [id],
    });

    return excute?.res ?? null;
  } catch (error) {
    console.log(error);
  }
}
