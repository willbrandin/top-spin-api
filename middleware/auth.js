const jwt = require('jsonwebtoken');

exports.isAuthorized = (request, response, next) => {
  let token = getToken(request);
  if (!token) {
    console.log('No token found');
    return response.status(403).json({ error: 'Unauthorized' })
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (decoded && decoded.id) {
      request.user = decoded
      return next();
    } else if (error) {
      return response.status(403).json({ error: 'Unauthorized' })
    } else {
      return response.status(403).json({ error: 'Unauthorized' })
    }
  })
}

exports.isAuthenticated = (request, response, next) => {
  let token = getToken(request);
  if (!token) {
    console.log('No token found');
    return response.status(403).json({ error: 'Unauthorized' })
  }

  if (request.user.id === request.params.userId) {
    return next();
  } else if (error) {
    return response.status(403).json({ error: 'Unauthorized' })
  } else {
    return response.status(403).json({ error: 'Unauthorized' })
  }
}

const getToken = (request) => {  
  let authorization = request.headers.authorization;
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.split('Bearer ')[1];
  }
}