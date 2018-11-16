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


app.use(
    bodyParser.json(),
    bodyParser.urlencoded({extended:false}),
    morgan('dev'),
    cors()
)

const userRouters = require('./routes/user.routes')
const playlistRouters = require('./routes/playlist.routes')


app.use('/api/accounts',userRouters)
app.use('/api/playlist',playlistRouters)




app.listen(process.env.PORT || 3000 ,()=>{
    console.log('node.js server is runing........');
})