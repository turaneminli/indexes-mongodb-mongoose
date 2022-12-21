const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const Product = require("./productModel");

// inserting multiple documents with Dummy data
(async function () {
  await mongoose.connect(process.env.URI);

  const categories = [
    "Education",
    "Clothes",
    "Entertainment",
    "Motivation",
    "Engineering",
  ];

  for (let i = 0; i < 3000; i++) {
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];

    const randomPrice = Math.floor(Math.random() * 200);

    await Product.create({
      name: `Book ${i}`,
      price: randomPrice,
      category: randomCategory,
    });
  }
})();
