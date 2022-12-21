const mongoose = require("mongoose");

// Model
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// creating index via Mongoose (compound index)
productSchema.index({ price: -1, category: -1 });

module.exports = mongoose.model("Product", productSchema);
