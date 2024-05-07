import express from 'express';

import v1Router from './v1';
const apiRouter = express.Router();

// if any request comes and route startds with /v1, we map it to v1Router
apiRouter.use('/v1', v1Router);
export default apiRouter;


