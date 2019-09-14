var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

let Schema = mongoose.Schema;

let user = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  userCredential: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date, 
    required: true
  }
});

// user.pre('save', async function(next){
//   try {
//     if(!this.isModified('userCredential')){
//       return next();
//     }
//     let hashedPassword = await bcrypt.hash(this.userCredential, 10);
//     this.userCredential = hashedPassword
//     return next();
//   } catch(err){
//     return next(err);
//   }
// });

// user.methods.comparePassword = async function(candidatePassword, next) {
//   try {
//     let isMatch = await bcrypt.compare(candidatePassword, this.userCredential);    
//     return isMatch
//   } catch(err){
//     return next(err);
//   }
// }

module.exports = mongoose.model('User', user);