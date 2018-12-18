const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose)

const PlaylistSchema = new Schema({
    name:String,
    description:String,
    ownerId:String,
    ownerName:String,
    created: {type:Date, default: Date.now},
    guests:[{type:Schema.Types.ObjectId, ref:'User'}],
    live:Boolean,
    blacklist:[{
        videoId:String,
        created:{type:String,default:true}
    }],
    nowPlaying:[{type:Schema.Types.ObjectId, ref:'Song'}]
})
PlaylistSchema.plugin(deepPopulate)
module.exports = mongoose.model('Playlist',PlaylistSchema) 




// vivo: {type:Boolean, default:true},//favorito
// userId:{type:Schema.Types.ObjectId, ref:'User'},



//     "data": {
//         "_id": "5bee89cab2d9f243e075143c",
//         "created": "2018-11-16T09:11:38.294Z",
//         "ownerId": "5bee78436afc5011fc1f0f8e",
//         "description": "noda",
//         "name": "fuego2",
//         "__v": 0
//     }
