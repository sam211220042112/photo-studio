const mongoose = require("mongoose")

const ImageSchema = new mongoose.Schema({

url:String,
category:String,
date:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Image",ImageSchema)