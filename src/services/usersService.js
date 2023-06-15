import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

// utils
import users from '../utils/users.js';

const addUser = async ({ username, password, fullname }) => {
  const id = `users-${nanoid(15)}`;
  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    id, username, password: hashedPassword, fullname,
  });

  return id;
};

const getUserById = async (userId) => {
  const findIndex = users.findIndex((user) => user.id === userId);

  const { id, username, fullname } = users[findIndex];

  return { id, username, fullname };
};

export default { addUser, getUserById };
