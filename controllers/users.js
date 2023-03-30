const { v4: uuidv4 } = require("uuid");
const { validateSchema } = require("../validator/validator.js");
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
        res.status(400).json(error.details);
    }
    try {
        users.push(user);
        return res.status(200).json(value);
    } catch (error) {
        return res.status(400).json(error);
    }
};

const getUser = (req, res) => {
    const userId = req.params.id;
    try {
        let currUser = users.find((user) => {
            return user.id === userId && user.isDeleted !== true;
        });
        if (currUser) {
            return res.status(200).json(currUser);
        } else {
            return res.status(400).json({ message: "User does not exist" });
        }
    } catch (error) {
        return res.status(400).json(error);
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
            return res.status(200).json("Deleted Successfully");
        } else {
            return res.status(400).json({ message: "User does not exist" });
        }
    } catch (error) {
        return res.status(400).json(error);
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
                return res.status(400).json(error.details);
            } else {
                return res.status(200).json(value);
            }
        } else {
            return res.status(400).json({ message: "User does not exist" });
        }
    } catch (error) {
        return res.status(400).json(error);
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
                .status(400)
                .json({ message: "No users matching the substring" });
        }

        matchedUsers.sort(compare);
        return res.status(200).json(matchedUsers.slice(0, limit));
    } catch (error) {
        return res.status(400).json(error);
    }
};
compare = (user1, user2) => {
    if (user1.login > user2.login) return 1;
    if (user1.login < user2.login) return -1;
    return 0;
};
module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    autoSuggestUsers,
};
