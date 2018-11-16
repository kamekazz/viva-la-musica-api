const router = require('express').Router()
const Playlist = require('../models/playlist')
const config = require('../conf/confing')
const checkJwt = require('../middleware/check-jwt')



router.get('/getall', checkJwt, (req,res,next) =>{

    let msdId = req.decoded.user._id

    Playlist.find({ownerId: msdId},(err, fandplaylistAll)=>{
        if (err) return next(err);
        if (fandplaylistAll) {
            res.json({
                success:false,
                message:'all playlist',
                data:fandplaylistAll
            }) 
        } else {
            res.json({
                success:true,
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


module.exports = router