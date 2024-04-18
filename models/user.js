const mongoose = require("mongoose");
const validate = require('validator');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(email){
        return validate.isEmail(email)
      },
      message: 'Please provide a valid email address'
    }
  },
  password: {
    type: String,
    required: true
  },
  IpAddress:{
    type: String
  },
  lastLogin: {
    type: Date
  },
  failedPasswordAttempts: {
    type: Number,
    default: 0
  },
  userAgent: {
    type: String
  }
},
{ timestamps: true }
);

//hash password before create user doc

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next()

  const salt =  await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.compareValues = async (newValue,originalValue) => await bcrypt.compare(newValue,originalValue);



module.exports = mongoose.model('User', userSchema);