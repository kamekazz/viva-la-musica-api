const router = require('express').Router()
const Playlist = require('../models/playlist')
const config = require('../conf/confing')
const checkJwt = require('../middleware/check-jwt')
const Song = require('../models/song')


router.get('/getall', checkJwt, (req,res,next) =>{
    let msdId = req.decoded.user._id
    Playlist.find({ownerId: msdId},(err, fandplaylistAll)=>{
        if (err) return next(err);
        if (fandplaylistAll) {
            res.json({
                success:true,
                message:'all playlist',
                data:fandplaylistAll
            }) 
        } else {
            res.json({
                success:false,
                message:'no list '
            })
        }
    })
})



router.post('/new', checkJwt, (req,res,next) =>{

    let playlist = new Playlist
    playlist.ownerId = req.decoded.user._id
    playlist.description =  req.body.description
    playlist.name =  req.body.name
    console.log(playlist.name);
    Playlist.findOne({name: playlist.name},(err, fandplaylist)=>{
        if (err) return next(err);
        if (fandplaylist) {
            res.json({
                success:false,
                message:'the playlist already exist'
            }) 
        } else {
            playlist.save()
            res.json({
                success:true,
                message:'new playlist done'
            })
        }
    })
})


router.post('/edit/:id', checkJwt, (req,res,next) =>{
    let playlistID = req.params.id
    let msdId = req.decoded.user._id
    let description =  req.body.description
    let name =  req.body.name

    Playlist.findOne({_id: playlistID },(err, fandplaylist)=>{

        if (err) return next(err);

        if (fandplaylist.ownerId === msdId ) {

            if(description) fandplaylist.description = description
            if(name) fandplaylist.name = name

            fandplaylist.save()
            res.json({
                success:true,
                message:'ok to edit '
            })
        } else {
            res.json({
                success:false,
                message:'not owner'
            })
        }
    })
})

router.delete('/delete/:id', checkJwt, (req,res,next) =>{
    let playlistID = req.params.id
    let msdId = req.decoded.user._id

    Playlist.findOne({_id: playlistID  },(err, fandplaylist)=>{
        if (err) return next(err);
        if (fandplaylist.ownerId === msdId) {
            fandplaylist.remove()
            res.json({
                success:true,
                message:'delete'
            })
        } else {
            res.json({
                success:false,
                message:'not owner'
            })
        }
    })
})

router.get('/songs/:id', checkJwt, (req,res,next) =>{
    let playlistId = req.params.id
    var query  =  Song.find({playlistId: playlistId})
    query.sort({vote:-1})
    query.exec(function (err, docs) {
        // called when the `query.complete` or `query.error` are called
        // internally
        if (err) return next(err);
        if (docs) {
            res.json({
                message:'todas tus casiosnes',
                data:docs
            })
        }
    });
})



module.exports = router