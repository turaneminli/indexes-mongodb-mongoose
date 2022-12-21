const Product = require("./productModel");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

(async function () {
  try {
    await mongoose.connect(process.env.URI);
  } catch (err) {
    console.log(err);
  }

  console.time("query_without_select_and_index");
  const products1 = await Product.find({
    price: { $gt: 180 },
    category: "Motivation",
  });
  //   console.log(products1);
  console.timeEnd("query_without_select_and_index"); // around 900ms

  // with indexing and without select 540-750ms

  console.time("query_with_select_and_index_and_lean");
  const products3 = await Product.find({
    price: { $gt: 180 },
    category: "Motivation",
  })
    .select({ price: 1, category: 1 })
    .lean();
  //   console.log(products3);
  console.timeEnd("query_with_select_and_index_and_lean"); // around 82-131ms

  console.time("query_with_select_and_index");
  const products2 = await Product.find({
    price: { $gt: 180 },
    category: "Motivation",
  }).select({ price: 1, category: 1 });
  //   console.log(products2);
  console.timeEnd("query_with_select_and_index"); // around 80-176ms
})();
