const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });

// creating partial index via MongoDB driver
const client = new MongoClient(process.env.URI);
(async function () {
  const database = client.db("nodeIndexes");
  const products = database.collection("products");
  products.createIndex(
    { category: -1 },
    { partialFilterExpression: { price: { $gt: 170 } } }
  );
  console.log("Hey");
})();
