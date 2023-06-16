// utils
import token from '../utils/authentications.js';

// exceptions
import InvariantError from '../exceptions/InvariantError.js';

const addRefreshToken = (refreshToken) => {
  token.push(refreshToken);
};

const verifyRefreshToken = (refreshToken) => {
  const index = token.findIndex((tkn) => tkn === refreshToken);

  if (index === -1) {
    throw new InvariantError('invalid refresh token');
  }
};

const deleteRefreshToken = (refreshToken) => {
  const index = token.findIndex((tkn) => tkn === refreshToken);

  token.splice(index, 1);
};

export default { addRefreshToken, verifyRefreshToken, deleteRefreshToken };
