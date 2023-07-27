const BASE_URL = "http://localhost:4002/admin";
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis({
  port: 13627,
  host: "redis-13627.c292.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  password: "UcPCs1P59nZGuNtRVONs3IDZwL1ksOfc",
});

const typeDefs = `
    type Category {
        id: ID!
        name: String
    }

    input categoryInput {
        name: String
    }

    type Query {
        getCategories: [Category]
        getCategory(id: ID!): Category
    }

    type Mutation {
      deleteCategory(
          id: ID
        ): Category
      createCategory(
          newProduct: categoryInput
        ): Category
      editCategory(
          newProduct: categoryInput
          id: ID
        ): Category
    }

`;

const resolvers = {
  Query: {
    getCategories: async () => {
      try {
        const dataCache = await redis.get("categories");
        console.log(dataCache, "<<<<<<<<<<<<<<<<<<<<");
        if (dataCache) {
          return JSON.parse(dataCache);
        } else {
          const {data} = await axios.get(`${BASE_URL}/categories`);

          await redis.set("categories", JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    getCategory: async (_, args) => {
      try {
        const {id} = args;
        const {data} = await axios.get(`${BASE_URL}/categories/${id}`);

        return data;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  },
  Mutation: {
    deleteCategory: async (_, args) => {
      try {
        const {id} = args;
        console.log(id);
        const {data} = await axios.delete(`${BASE_URL}/categories/${id}`);
        if (data) {
          await redis.del("categories");
        }

        return data;
      } catch (err) {
        return err.response.data;
      }
    },
    createCategory: async (_, {name}) => {
      try {
        const {data} = await axios.post(`${BASE_URL}/categories`, {
          name,
        });
        if (data) {
          await redis.del("categories");
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    editCategory: async (_, args) => {
      try {
        const {name} = args.newPost;
        const {id} = args;
        const {data} = await axios.put(`${BASE_URL}/categories/${id}`, {
          name,
        });
        if (data) {
          await redis.del("categories");
        }
        return data;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
