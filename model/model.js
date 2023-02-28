const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    
    Name: { type: String, required: true },
    Location: { type: String, required: true },
    Likes: { type: Number, required:true },
    Description: { type: String, required: true },
    PostImage: { data: Buffer, contentType: String },
    Date: { type: String, default: new Date().toLocaleDateString() },
  },
  { timestamps: true }
);

const userModel = mongoose.model('User', userSchema)

module.exports = userModel