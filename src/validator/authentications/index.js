import InvariantError from '../../exceptions/InvariantError.js';
import { PostAuthenticationPayload } from './schema.js';

const AuthenticationsValidator = {
  validatePostAuthenticationPayload: (payload) => {
    const validationResult = PostAuthenticationPayload.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default AuthenticationsValidator;
