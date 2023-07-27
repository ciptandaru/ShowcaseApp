// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
//   }
  
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const router = require('./router/index.js');

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Orchestrator-express listening on port ${port}`);
});


// module.exports = app 
