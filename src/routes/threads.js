import express from 'express';

// controller
import threadsController from '../controllers/threadsController.js';

// middleware
import authenticationMiddleware from '../middleware/authenticationMiddleware.js';

const threadRouter = express.Router();

threadRouter.get('/threads', threadsController.getThreadsController);
threadRouter.get('/threads/:threadId', threadsController.getThreadByIdController);

threadRouter.use(authenticationMiddleware);

threadRouter.post('/threads', threadsController.postThreadController);
threadRouter.put('/threads/:threadId', threadsController.putThreadByIdController);
threadRouter.delete('/threads/:threadId', threadsController.deleteThreadByIdController);

export default threadRouter;
