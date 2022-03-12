import type { NextApiRequest, NextApiResponse } from 'next';

const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const util = require('util');
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

async function jwtMiddleware(req: NextApiRequest, res: NextApiResponse) {
  const middleware = expressJwt({
    secret: serverRuntimeConfig.secret,
    algorithms: ['HS256'],
  }).unless({
    path: [
      // public routes that don't require authentication
      '/api/users/authenticate',
      '/api/users/register',
      { url: /^\/api\/products/, methods: ['GET'] },
      { url: /^\/api\/products\/.*/, methods: ['GET'] },
      { url: /^\/api\/orders\/.*/, methods: ['GET'] },
    ],
  }); 

  return util.promisify(middleware)(req, res);
}
