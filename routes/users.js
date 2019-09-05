const express = require('express'),
  router = express.Router(),
  users = require('../controllers/users');

router.post('/', users.signIn);

module.exports = router;