const express = require('express');
const db = require('../controllers/users.js');
const router = express.Router();


router.get('/users', db.getUsers);

router.get('/users/:id', db.getUser);

router.get('/getAutoSuggestUsers/:loginSubstring/:limit', db.autoSuggestUsers);

router.post('/signup', db.createUser);

router.delete('/users/:id', db.deleteUser);

router.put('/users/:id', db.updateUser);


module.exports = router;
