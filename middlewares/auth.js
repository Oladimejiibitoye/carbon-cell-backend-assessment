const { UnauthorizedError } = require("../helpers/errors");
const { UserRepository } = require("../services/auth");
const {
  ACCESS_TOKEN_SECRET,
  JWT_AUDIENCE,
  JWT_ISSUER,
  JWT_ALGORITHM,
} = require("../environment/config");

const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let token;
  try {
    if (
      //In http headers, we have authorisations object
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ){
      //Get token from bearer. split turns it into an array and gets value of position [1] which is token. value of [0] = bearer tag
      token = await req.headers.authorization.split(" ")[1];
      if (!token) {
        throw new UnauthorizedError("Invalid Token");
      }

      const decodedData = jwt.verify(token, ACCESS_TOKEN_SECRET, {
        complete: true,
        audience: JWT_AUDIENCE,
        issuer: JWT_ISSUER,
        algorithms: [JWT_ALGORITHM],
        clockTolerance: 0,
        ignoreExpiration: false,
        ignoreNotBefore: false,
      });

      // Get user from the token
      const currentUser = await UserRepository.findSafeUserById(
        decodedData?.payload?.id
      );
      if (!currentUser) {
        throw new UnauthorizedError("Invalid token");
      }
      req.user = currentUser;

      next();
    } else {
      throw new UnauthorizedError("Invalid token")
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };
