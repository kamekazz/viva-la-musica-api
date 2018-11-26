const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const confing = require('./conf/confing')


const app =  express()

mongoose.connect(`mongodb://${confing.dbUser}:${confing.dbPassword}@ds037415.mlab.com:37415/dare`,{ useNewUrlParser: true },(err)=>{
    if (err) {
        console.log(`Mcod:.......................v1.0 ${err}`);
    } else {
        console.log(`mlab DB is runing.......`);
    }
})

var whitelist = [
    'http://localhost:3000/signin',
];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use( morgan('dev'))
app.use(cors(corsOptions))

   
    



const userRouters = require('./routes/user.routes')
const playlistRouters = require('./routes/playlist.routes')
const songRouters = require('./routes/song.routes')


app.use('/api/accounts',userRouters)
app.use('/api/playlist',playlistRouters)
app.use('/api/song',songRouters)




app.listen(process.env.PORT || 3090 ,()=>{
    console.log('node.js server is runing........');
})