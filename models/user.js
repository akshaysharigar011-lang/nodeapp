const mongoose = require("mongoose");


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },


    email: {
      type: String,
      required: true,
      unique: true,
      // === ADDED VALIDATION HERE ===
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please enter a valid email address']
    },


    password: {    
         type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);


const User = mongoose.model("User", userSchema);


module.exports = User;