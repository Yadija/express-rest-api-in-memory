import { nanoid } from 'nanoid';

// exceptions
import AuthorizationError from '../exceptions/AuthorizationError.js';
import NotFoundError from '../exceptions/NotFoundError.js';

// utils
import threads from '../utils/threads.js';

const addthread = (content, owner) => {
  const id = `thread-${nanoid(15)}`;

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const thread = {
    id, content, owner, createdAt, updatedAt,
  };
  threads.push(thread);

  return id;
};

const getAllThreads = () => threads.map(({ id, content, owner }) => ({ id, content, owner }));

const findThreadById = (id) => {
  const index = threads.findIndex((thread) => thread.id === id);

  if (index === -1) {
    throw new NotFoundError('Cannot find thread');
  }

  return index;
};

const getThreadById = (id) => {
  const index = findThreadById(id);

  const thread = threads[index];
  return thread;
};

const editThreadById = (id, content) => {
  const index = findThreadById(id);
  const updatedAt = new Date().toISOString();

  threads[index] = {
    ...threads[index],
    content,
    updatedAt,
  };
};

const verifyThreadOwner = (id, owner) => {
  const index = findThreadById(id);

  const thread = threads[index];
  if (thread.owner !== owner) {
    throw new AuthorizationError('you are not entitled to access this resource');
  }
};

const deleteThreadById = (id) => {
  const index = findThreadById(id);
  threads.splice(index, 1);
};

export default {
  addthread,
  getAllThreads,
  getThreadById,
  editThreadById,
  deleteThreadById,
  verifyThreadOwner,
};
