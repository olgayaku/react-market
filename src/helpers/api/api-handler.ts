import type { NextApiRequest, NextApiResponse } from 'next';

import { errorHandler, jwtMiddleware } from './';

export { apiHandler };

function apiHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // global middleware
      await jwtMiddleware(req, res);

      // route handler
      await handler(req, res);
    } catch (err: any) {
      // global error handler
      errorHandler(err, res);
    }
  };
}
