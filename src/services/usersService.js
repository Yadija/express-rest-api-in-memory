import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

// exceptions
import AuthenticationError from '../exceptions/AuthenticationError.js';
import InvariantError from '../exceptions/InvariantError.js';
import NotFoundError from '../exceptions/NotFoundError.js';

// utils
import users from '../utils/users.js';

const verifyNewUsername = async (username) => {
  const findIndex = users.findIndex((user) => user.username === username);

  if (findIndex !== -1) {
    throw new InvariantError('username already exists');
  }
};

const addUser = async ({ username, password, fullname }) => {
  await verifyNewUsername(username);

  if (/\s/.test(username)) {
    throw new InvariantError('username contain forbiden character');
  }

  const id = `users-${nanoid(15)}`;
  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    id, username, password: hashedPassword, fullname,
  });

  return id;
};

const getUserById = async (userId) => {
  const findIndex = users.findIndex((user) => user.id === userId);

  if (findIndex === -1) {
    throw new NotFoundError('Cannot find user');
  }

  const { id, username, fullname } = users[findIndex];

  return { id, username, fullname };
};

const verifyUserCredential = async (username, password) => {
  const findIndex = users.findIndex((user) => user.username === username);

  if (findIndex === -1) {
    throw new InvariantError('username not register');
  }

  const { id, password: hashedPassword } = users[findIndex];

  const match = await bcrypt.compare(password, hashedPassword);

  if (!match) {
    throw new AuthenticationError('password incorrect');
  }

  return id;
};

export default { addUser, getUserById, verifyUserCredential };
