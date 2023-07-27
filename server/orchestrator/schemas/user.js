const BASE_URL = "http://localhost:4001";
const axios = require("axios");

// Define Schema (Type Definition)
const typeDefs = `#graphql
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type UserDeleteResult {
    statusCode: Int
    message: String
  }

  type UserPostResult {
    statusCode: Int
    message: String
  }

  type Query {
    getAllUsers: [User]
    getOneUser(id: ID!): User
  }

  type Mutation {
    postUser(
      username: String
      email: String
      password: String
      phoneNumber: Int
      address: String
    ): UserPostResult
    deleteUser(_id: String!): UserDeleteResult
  }
`;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      const {data} = await axios.get(`${BASE_URL}/users`);
      return data.data;
    },
    getOneUser: async (_, {id}) => {
      const {data} = await axios.get(`${BASE_URL}/users/${id}`);
      return data.data;
    },
  },
  Mutation: {
    postUser: async (_, {username, email, password, phoneNumber, address}) => {
      try {
        const {data} = await axios.post(`${BASE_URL}/users`, {
          username,
          email,
          password,
          phoneNumber,
          address,
        });
        return {
          statusCode: 200,
          message: "User created successfully",
          user: data.data,
        };
      } catch (error) {
        return {
          statusCode: error.response.status,
          message: error.response.data.error,
          user: null,
        };
      }
    },
    deleteUser: async (_, {_id}) => {
      const {data} = await axios.delete(`${BASE_URL}/users/${_id}`);
      return data;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
