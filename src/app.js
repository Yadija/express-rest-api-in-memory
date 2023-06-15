/* eslint-disable no-console */
import express from 'express';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import 'dotenv/config';

const port = process.env.PORT;

const app = express();
app.use(express.json());

const users = [];

const userRouter = express.Router();
userRouter.post('/users', async (req, res) => {
  const id = `users-${nanoid(15)}`;
  const { username, password, fullname } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    id, username, password: hashedPassword, fullname,
  });
  res.status(201).json({
    status: 'success',
    data: {
      userId: id,
    },
  });
});

app.use(userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
