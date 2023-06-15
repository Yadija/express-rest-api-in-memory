import express from 'express';

// controllers
import authenticationsController from '../controllers/authenticationsController.js';

const authenticationRouter = express.Router();
authenticationRouter.post('/authentications', authenticationsController.postAuthenticationController);

export default authenticationRouter;
