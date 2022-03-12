import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

const jwt = require('jsonwebtoken');

import { userDatabase } from 'src/database/user';
import { apiHandler } from 'src/helpers/api';


const { serverRuntimeConfig } = getConfig();

export default apiHandler(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return await authenticate();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function authenticate() {
    const { email, uid } = req.body;

    const users = await userDatabase.getUsers();
    if (!users) {
      return res.status(500);
    }

    const user = users.find((u) => u.email === email && u.uid === uid);

    if (!user) throw 'Email or uid is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign(
      { id: user.id, role: user.role },
      serverRuntimeConfig.secret,
      {
        expiresIn: '7d',
      }
    );

    // return basic user details and token
    return res.status(200).json({
      ...user,
      token,
    });
  }
}
