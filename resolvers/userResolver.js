const User = require("../models/User"); // Pastikan path ini benar
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/auth"); // Pastikan path ini benar

const resolvers = {
    Query: {
        async getUser(_, { username }) {
            const user = await User.findOne({ username });
            if (!user) throw new Error("User not found");
            return user;
        },
    },
    Mutation: {
        async login(_, { username, password }) {
            const user = await User.findOne({ username });
            if (!user) throw new Error("User not found");

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error("Invalid credentials");

            const token = jwt.sign({ id: user.id }, JWT_SECRET, {
                expiresIn: "1h",
            });
            return { token };
        },
        async register(_, { name, username, email, password }) {
            const existingUser =
                (await User.findOne({ username })) ||
                (await User.findOne({ email }));
            if (existingUser) throw new Error("User already exists");

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = new User({
                name,
                username,
                email,
                password: hashedPassword,
            });
            const user = await newUser.save();

            const token = jwt.sign({ id: user.id }, JWT_SECRET, {
                expiresIn: "1h",
            });
            return { token };
        },
    },
};

module.exports = resolvers;
