// utils
import token from '../utils/authentications.js';

const addRefreshToken = async (refreshToken) => {
  token.push(refreshToken);
};

export default { addRefreshToken };
