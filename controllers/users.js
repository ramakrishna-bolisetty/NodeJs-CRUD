const { v4: nuuidv4 } = require('uuid');
const { validateSChema } = require('../validator/validator');
const { SUCCESS, ERROR } = require('../config.js');


const users = [];

const getUsers = (req, res) => {
    res.send(users);
};
const createUser = (req, res) => {
    const user = req.body;
    user["id"] = uuidv4();
    const { error, value } = validateSchema(user);
    if (error) {
        console.log(error);
        res.status(ERROR).json(error.details);
    }
    try {
        users.push(user);
        return res.status(SUCCESS).json(value);
    } catch (error) {
        return res.status(ERROR).json(error);
    }
};

const getUser = (req, res) => {
    const userId = req.params.id;
    try {
        let currUser = users.find((user) => {
            return user.id === userId && user.isDeleted !== true;
        });
        if (currUser) {
            return res.status(SUCCESS).json(currUser);
        } else {
            return res.status(ERROR).json({ message: 'User does not exist' });
        }
    } catch (error) {
        return res.status(ERROR).json(error);
    }
};
const deleteUser = (req, res) => {
    const userId = req.params.id;
    try {
        let user = users.find((user) => {
            return user.id === userId && user.isDeleted !== true;
        });
        if (user) {
            user.isDeleted = true;
            return res.status(SUCCESS).json('Deleted Successfully');
        } else {
            return res.status(ERROR).json({ message: 'User does not exist' });
        }
    } catch (error) {
        return res.status(ERROR).json(error);
    }
};
const updateUser = (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    try {
        let currUser = users.find((user) => {
            return user.id === userId && user.isDeleted !== true;
        });
        if (currUser) {
            currUser.login = userData.login || currUser.login;
            currUser.password = userData.password || currUser.password;
            currUser.age = userData.age || currUser.age;
            currUser.isDeleted = userData.isDeleted || currUser.isDeleted;

            const { error, value } = validateSchema(currUser);
            if (error) {
                console.log(error);
                return res.status(SUCCESS).json(error.details);
            } else {
                return res.status(ERROR).json(value);
            }
        } else {
            return res.status(ERROR).json({ message: 'User does not exist' });
        }
    } catch (error) {
        return res.status(ERROR).json(error);
    }
};

const autoSuggestUsers = (req, res) => {
    const loginSubstring = req.params.loginSubstring;
    const limit = req.params.limit;
    const matchedUsers = [];
    try {
        users.forEach(function (user) {
            if (user.login.includes(loginSubstring) && user.isDeleted !== true) {
                matchedUsers.push(user);
            }
        });

        if (matchedUsers.length === 0) {
            return res
                .status(ERROR)
                .json({ message: 'No users matching the substring' });
        }

        matchedUsers.sort(compare);
        return res.status(SUCCESS).json(matchedUsers.slice(0, limit));
    } catch (error) {
        return res.status(ERROR).json(error);
    }
};
compare = (user1, user2) => {
    if (user1.login > user2.login)
     return 1;
    return -1;
};
module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    autoSuggestUsers,
};
