const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose)

const SongSchema = new Schema({
    title:String,
    description:String,
    videoId:String,
    imageUrl:String,
    created: {type:Date, default: Date.now},
    votantelId:[String],
    vote:Number,
    playlistId:String,
    duration:Number
})
SongSchema.plugin(deepPopulate)
module.exports = mongoose.model('Song',SongSchema) 


 // https://www.googleapis.com/youtube/v3/videos?id=9bZkp7q19f0&part=contentDetails&key={YOUR_API_KEY} 
//  const API_KEY = 'AIzaSyD0JpBJqOZVZIg-1sWtNwVE7KHSwVxtSj8'