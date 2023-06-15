/* eslint-disable no-console */
import express from 'express';
import 'dotenv/config';

import userRouter from './routes/users.js';

const port = process.env.PORT;

const app = express();
app.use(express.json());

app.use(userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
