const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        name: String!
        username: String!
        email: String!
    }

    type AuthPayload {
        token: String
    }

    type Query {
        getUser(username: String!): User
    }

    type Mutation {
        login(username: String!, password: String!): AuthPayload
        register(
            name: String!
            username: String!
            email: String!
            password: String!
        ): AuthPayload
    }
`;

module.exports = typeDefs;
