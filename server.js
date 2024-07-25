require("dotenv").config();
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

const app = express();

// Setup Mongoose
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Create Apollo Server instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startServer = async () => {
    // Start Apollo Server
    await server.start();

    // Apply middleware after the server has started
    server.applyMiddleware({ app });

    // Start the Express server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`GraphQL endpoint available at ${server.graphqlPath}`);
    });
};

// Run the server
startServer();
