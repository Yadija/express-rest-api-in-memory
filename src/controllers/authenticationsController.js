// services
import authenticationsService from '../services/authenticationsService.js';
import usersService from '../services/usersService.js';

// token
import tokenManager from '../tokenize/tokenManager.js';

// validator
import AuthenticationsValidator from '../validator/authentications/index.js';

const postAuthenticationController = async (req, res, next) => {
  try {
    AuthenticationsValidator.validatePostAuthenticationPayload(req.body);

    const { username, password } = req.body;
    const id = await usersService.verifyUserCredential(username, password);

    const accessToken = tokenManager.generateAccessToken({ id });
    const refreshToken = tokenManager.generateRefreshToken({ id });

    authenticationsService.addRefreshToken(refreshToken);

    res.status(201).json({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const putAuthenticationController = async (req, res, next) => {
  try {
    AuthenticationsValidator.validatePutAuthenticationPayload(req.body);

    const { refreshToken } = req.body;
    authenticationsService.verifyRefreshToken(refreshToken);

    const { id } = tokenManager.verifyRefreshToken(refreshToken);
    const accessToken = tokenManager.generateAccessToken({ id });

    res.status(200).json({
      status: 'success',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteAuthenticationController = async (req, res, next) => {
  try {
    AuthenticationsValidator.validateDeleteAuthenticationPayload(req.body);

    const { refreshToken } = req.body;

    authenticationsService.verifyRefreshToken(refreshToken);
    authenticationsService.deleteRefreshToken(refreshToken);

    res.status(200).json({
      status: 'success',
      message: 'refresh token deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  postAuthenticationController,
  putAuthenticationController,
  deleteAuthenticationController,
};
