// utils
import token from '../utils/authentications.js';

// exceptions
import InvariantError from '../exceptions/InvariantError.js';

const addRefreshToken = (refreshToken) => {
  token.push(refreshToken);
};

const verifyRefreshToken = (refreshToken) => {
  const findIndex = token.findIndex((tkn) => tkn === refreshToken);

  if (findIndex === -1) {
    throw new InvariantError('Refresh token invalid');
  }
};

const deleteRefreshToken = (refreshToken) => {
  const findIndex = token.findIndex((tkn) => tkn === refreshToken);

  token.splice(findIndex, 1);
};

export default { addRefreshToken, verifyRefreshToken, deleteRefreshToken };
