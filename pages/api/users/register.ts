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
      return await register();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function register() {
    const { user} = req.body;

    const result = await userDatabase.createUser(user);
    if (!result) {
      return res.status(500);
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign(
      { id: result.id, role: user.role },
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
