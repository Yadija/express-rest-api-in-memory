import express from 'express';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

import users from '../utils/users.js';

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

userRouter.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  const findIndex = users.findIndex((user) => user.id === userId);

  if (findIndex === -1) {
    res.status(404).json({
      status: 'fail',
      message: 'cannot find user',
    });

    return;
  }

  const { id, username, fullname } = users[findIndex];
  res.status(200).json({
    status: 'success',
    data: {
      id, username, fullname,
    },
  });
});

export default userRouter;
