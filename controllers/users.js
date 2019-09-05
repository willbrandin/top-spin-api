const { User } = require('../models');
const jwt = require('jsonwebtoken');

exports.signIn = (request, response) => {

  User.findOne({ email: request.body.email }).exec()
  .then(user => {  
    console.log(user);
      
    if (user !== null) {
      signIn(user, request, response);
    } else {
      createUser(request, response);
    }
  })
  .catch(error => {
    response.status(500).json(error);
  })
}

const createUser = (request, response) => {
  let token;
  let user = {
    email: request.body.email,
    password: request.body.password,
    createdDate: new Date().toISOString()
  }
  User.create(user)
  .then(newUser => {
    const { id } = newUser
    token = jwt.sign({ id }, process.env.SECRET_KEY);
    console.log(`${id} created`);
    response.status(201).json({ newUser, token })
  })
  .catch(error => {
    response.status(500).json(error);
  })
}

const signIn = (user, request, response) => {  
  user.comparePassword(request.body.password)
  .then(didMatch => {    
    if (didMatch) {
      const { id } = user;
      let token = jwt.sign({ id }, process.env.SECRET_KEY);
      console.log(`${id} signed in`);
      return response.status(200).json({user: user, token});
    } else {
      response.status(400).json({ message: "Invalid email and password" });
    }
  })
  .catch(error => {
    response.status(500).json(error);
  })
}