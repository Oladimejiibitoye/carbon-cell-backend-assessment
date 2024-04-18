const { 
  ACCESS_TOKEN_EXPIRES_IN, 
  ACCESS_TOKEN_NOT_BEFORE, 
  ACCESS_TOKEN_SECRET, 
  JWT_AUDIENCE, 
  JWT_ISSUER, JWT_ALGORITHM } = require("../environment/config");
const { BadRequestError} = require("../helpers/errors");
const UserRepository = require("../repository/user");
const jwt = require("jsonwebtoken");

class AuthService {
  constructor(UserRepository){
    this.UserRepository = UserRepository;
  }


  async signUpService(userBody){
    const {email, password} = userBody
    const existingUser = await this.UserRepository.findOneUser({email})
    if(existingUser){
      throw new BadRequestError(`We're sorry, but the email address you entered is already associated with an existing account. Please double-check your email or try signing in with the correct password.
      If you've forgotten your password, you can reset it using the "Forgot Password" link.`)
    }
    
    const newUser = await this.UserRepository.createUser({email, password})
    return newUser._id
  }

  async signInUserService(userBody, headers){
    const {email, password} = userBody;
    const existingUser = await this.UserRepository.findOneUser({email})
    if(!existingUser){
      throw new BadRequestError('Invalid Credentials')
    }
    if(!(await existingUser.compareValues(password, existingUser.password))){
      await this.UserRepository.updateUser(existingUser._id, {failed_password_attempts: existingUser.failed_password_attempts + 1})
      throw new BadRequestError('Invalid Credentials')
    }

    const updatedUser = await this.UserRepository.updateUser(existingUser._id, {userAgent: headers['user-agent']})

    const accessToken = jwt.sign(
      {id: existingUser._id },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      notBefore: ACCESS_TOKEN_NOT_BEFORE, // Cannot use before now, can be configured to be deferred.
      algorithm: JWT_ALGORITHM,
      audience: JWT_AUDIENCE,
      issuer: JWT_ISSUER }
    );

    return {accessToken}
  }
}

module.exports = new AuthService(UserRepository)