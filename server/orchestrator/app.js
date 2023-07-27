const {ApolloServer} = require("@apollo/server");
const {startStandaloneServer} = require("@apollo/server/standalone");

const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schemas/user");

const {
  typeDefs: productTypeDefs,
  resolvers: productResolvers,
} = require("./schemas/product");

const {
  typeDefs: categoryTypeDefs,
  resolvers: categoryResolvers,
} = require("./schemas/category");

(async () => {
  const server = new ApolloServer({
    typeDefs: [userTypeDefs, productTypeDefs, categoryTypeDefs],
    resolvers: [userResolvers, productResolvers, categoryResolvers],

    introspection: true,
  });

  const {url} = await startStandaloneServer(server, {
    listen: {port: 4000},
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
