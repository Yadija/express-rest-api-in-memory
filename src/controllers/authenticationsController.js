import jwt from 'jsonwebtoken';

// services
import authenticationsService from '../services/authenticationsService.js';
import usersService from '../services/usersService.js';

// validator
import AuthenticationsValidator from '../validator/authentications/index.js';

const postAuthenticationController = async (req, res, next) => {
  try {
    AuthenticationsValidator.validatePostAuthenticationPayload(req.body);

    const { username, password } = req.body;
    const id = await usersService.verifyUserCredential(username, password);

    const accessToken = jwt.sign(
      { id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_AGE },
    );
    const refreshToken = jwt.sign(
      { id },
      process.env.REFRESH_TOKEN_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_AGE },
    );

    await authenticationsService.addRefreshToken(refreshToken);

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

export default { postAuthenticationController };
