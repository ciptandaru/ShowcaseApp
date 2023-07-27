const {MongoClient} = require("mongodb");

// const connectionString =
//   "mongodb+srv://ciptandaru:Mo06SpC0bmoTT1O3@cluster0.p2nushc.mongodb.net/";
// const connectionString = "mongodb://127.0.0.1:27017";
const connectionString =
  process.env.DATABASE_URL ||
  "mongodb+srv://ciptandaru:Mo06SpC0bmoTT1O3@cluster0.p2nushc.mongodb.net/?retryWrites=true&w=majority";

let db = null;

const mongoConnect = async () => {
  const client = new MongoClient(connectionString);

  try {
    await client.connect();
    const database = client.db("c2");
    db = database;
    return database;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const getDatabase = () => db;

module.exports = {
  mongoConnect,
  getDatabase,
};
