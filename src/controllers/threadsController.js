// services
import threadsService from '../services/threadsService.js';

// validator
import ThreadsValidator from '../validator/threads/index.js';

const postThreadController = async (req, res, next) => {
  try {
    ThreadsValidator.validateThreadPayload(req.body);

    const { content } = req.body;
    const { credentialId: owner } = req;

    const id = threadsService.addthread(content, owner);

    res.status(201).json({
      status: 'success',
      data: {
        threadId: id,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getThreadsController = async (req, res, next) => {
  try {
    const threads = threadsService.getAllThreads();

    res.status(200).json({
      status: 'success',
      data: {
        threads,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getThreadByIdController = async (req, res, next) => {
  try {
    const { threadId } = req.params;
    const thread = threadsService.getThreadById(threadId);

    res.status(200).json({
      status: 'success',
      data: {
        thread,
      },
    });
  } catch (error) {
    next(error);
  }
};

const putThreadByIdController = async (req, res, next) => {
  try {
    ThreadsValidator.validateThreadPayload(req.body);

    const { threadId } = req.params;
    const { content } = req.body;
    const { credentialId: owner } = req;

    threadsService.verifyThreadOwner(threadId, owner);
    threadsService.editThreadById(threadId, content);

    res.status(200).json({
      status: 'success',
      message: 'thread updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

const deleteThreadByIdController = async (req, res, next) => {
  try {
    const { threadId } = req.params;
    const { credentialId: owner } = req;

    threadsService.verifyThreadOwner(threadId, owner);
    threadsService.deleteThreadById(threadId);

    res.status(200).json({
      status: 'success',
      message: 'thread deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  postThreadController,
  getThreadsController,
  getThreadByIdController,
  putThreadByIdController,
  deleteThreadByIdController,
};
