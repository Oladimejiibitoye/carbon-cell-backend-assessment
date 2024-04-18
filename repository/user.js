const User = require("../models/user");

class UserRepository {
  constructor(User){
    this.User = User;
  }
  async createUser(userData) {
    return this.User.create(userData);
  }

  async findUserById(id){
    return this.User.findById(id)
  }

  async findSafeUserById(id){
    return this.User.findOne({_id: id}, '-password')
  }

  async findOneUser(query){
    return this.User.findOne(query)
  }

  async updateUser(id, updatedUserData){
    return this.User.findByIdAndUpdate(id, updatedUserData, {new: true})
  }

  async deleteUser(userId){
    return this.User.findByIdAndRemove(userId)
  }
}

module.exports = new UserRepository(User)