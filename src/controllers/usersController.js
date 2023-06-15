// utils
import users from '../utils/users.js';

// services
import usersService from '../services/usersService.js';

const postUserController = async (req, res) => {
  const id = await usersService.addUser(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      userId: id,
    },
  });
};

const getUsersByIdController = async (req, res) => {
  const { userId } = req.params;

  const findIndex = users.findIndex((user) => user.id === userId);

  if (findIndex === -1) {
    res.status(404).json({
      status: 'fail',
      message: 'cannot find user',
    });

    return;
  }

  const user = await usersService.getUserById(userId);
  res.status(200).json({
    status: 'success',
    data: user,
  });
};

export default { postUserController, getUsersByIdController };
