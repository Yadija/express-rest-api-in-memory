// services
import usersService from '../services/usersService.js';

// validator
import UsersValidator from '../validator/users/index.js';

const postUserController = async (req, res, next) => {
  try {
    UsersValidator.validateUserPayload(req.body);
    const id = await usersService.addUser(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        userId: id,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUsersByIdController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await usersService.getUserById(userId);
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default { postUserController, getUsersByIdController };
