const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
    minLength: 2,
    required: [true, "Category Must Have A Name"],
  },

  icon: String,
});

const Category = new mongoose.model("category", categorySchema);

module.exports = Category;
