const { User, MatchSetting } = require('../models');
const jwt = require('jsonwebtoken');

exports.signIn = (request, response) => {
  if (!request.body.userCredential) {
    response.status(403).json({message: 'No user credential'})
    return 
  }
  
  User.findOne({ userCredential: request.body.userCredential }).exec()
  .then(user => {        
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

exports.getUser = (request, response) => {
  let userId = request.user.id;
  User.findById(userId)
  .then(user => {
    response.status(200).json(user);
  })
  .catch(error => {
    response.status(500).json(error);
  })
}

exports.updateUser = (request, response) => {
  const updateQuery = {
    email: request.body.email
  }
  User.findOneAndUpdate({id: requsadest.params.userId}, updateQuery, {new: true})
  .then(user => {
    response.status(200).json(user);
  })
  .catch(error => {
    response.status(500).json(error);
  })
}

const createUser = (request, response) => {
  let token, createdUser;
  let user = new User ({
    email: request.body.email,
    name: request.body.name,
    userCredential: request.body.userCredential,
    createdDate: new Date().toISOString()
  })
  
  user.save()
  .then(newUser => {
    createdUser = newUser
    let matchSetting = new MatchSetting({
      user: user
    })
    
    return matchSetting.save()
  })
  .then(settings => {
    const { id } = createdUser
    token = jwt.sign({ id }, process.env.SECRET_KEY);
    response.status(201).json({ user: createdUser, token })
  })
  .catch(error => {
    response.status(500).json(error);
  })
}

const signIn = (user, request, response) => {  
    const { id } = user;
    let token = jwt.sign({ id }, process.env.SECRET_KEY);
    return response.status(200).json({user: user, token});
}