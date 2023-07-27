const BASE_URL = "http://localhost:4002/admin";
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis({
  port: 13627,
  host: "redis-13627.c292.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  password: "UcPCs1P59nZGuNtRVONs3IDZwL1ksOfc",
});

const typeDefs = `
    type Product {
        id: ID!
        name: String
        slug: String
        description: String
        price: String
        mainImg: String
        CategoryId: Int
        AuthorMongoId: String
        Category: Category
        Images:[Image]
    }

    type Category {
        id: ID!
        name: String
    }

    type User {
        _id: ID!
        email: String
    }

    type Image {
        id: ID!
        ProductId: Int
        imgUrl: String
    }

    input ProductInput {
      name: String
      description: String
      price: String
      mainImg: String
      CategoryId: Int
      images1: String
      images2: String
      images3: String
    }

    type Query {
        getProducts: [Product]
        getProduct(slug: String!): Product
    }

    type Mutation {
      deleteProduct(
          id: ID
        ): Product
      createProduct(
          newProduct: ProductInput
        ): Product
      editProduct(
          newProduct: ProductInput
          id: ID
        ): Product
    }

`;

const resolvers = {
  Query: {
    getProducts: async () => {
      try {
        const dataCache = await redis.get("products");
        if (dataCache) {
          return JSON.parse(dataCache);
        } else {
          const {data} = await axios.get(`${BASE_URL}/products`);

          await redis.set("products", JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    getProduct: async (_, args) => {
      try {
        const {slug} = args;
        const {data} = await axios.get(`${BASE_URL}/${slug}`);

        return data;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  },
  Mutation: {
    deleteProduct: async (_, args) => {
      try {
        const {id} = args;
        console.log(id);
        const {data} = await axios.delete(`${BASE_URL}/products/${id}`);
        if (data) {
          await redis.del("products");
        }

        return data;
      } catch (err) {
        return err.response.data;
      }
    },
    createProduct: async (
      _,
      {name, description, price, mainImg, CategoryId, images1, images2, images3}
    ) => {
      try {
        const {data} = await axios.post(`${BASE_URL}/products`, {
          name,
          description,
          price,
          mainImg,
          CategoryId,
          images1,
          images2,
          images3,
        });
        if (data) {
          await redis.del("products");
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    editProduct: async (_, args) => {
      try {
        const {
          name,
          description,
          price,
          mainImg,
          CategoryId,
          images1,
          images2,
          images3,
        } = args.newPost;
        const {slug} = args;
        const {data} = await axios.put(`${BASE_URL}/${slug}`, {
          name,
          description,
          price,
          mainImg,
          CategoryId,
          images1,
          images2,
          images3,
        });
        if (data) {
          await redis.del("products");
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
