const router = require('express').Router()
const Song = require('../models/song')
const config = require('../conf/confing')
const checkJwt = require('../middleware/check-jwt')

router.post('/add', checkJwt, (req,res,next) =>{

    let song = new Song
    song.title = req.body.title
    song.description = req.body.description
    song.videoId = req.body.videoId
    song.imageUrl = req.body.imageUrl
    song.playlistId = req.body.playlistId

    song.votantelId = req.decoded.user._id
    song.vote = 1

    Song.findOne({videoId: song.videoId},(err, songfond)=>{
        if (err) return next(err);
        if (songfond) {
            res.json({
                success:false,
                message:'the Song already in playlist exist'
            }) 
        } else {
            song.save()
            res.json({
                success:true,
                message:'new Song Add'
            })
        }
    })
})


router.post('/voteup/:id', checkJwt, (req,res,next) =>{

    let votantelId = req.decoded.user._id
    let songId = req.params.id

    Song.findOne({_id: songId},(err, songfond)=>{
        if (err) return next(err);
        if (checkAvailability(songfond.votantelId,votantelId)) {
            res.json({
                success:false,
                message:'you laredy vote '
            })
        }else{

            if (songfond) {
                songfond.vote = songfond.vote + 1
                songfond.votantelId.push(votantelId)
                songfond.save()
                res.json({
                    success:true,
                    message:'song is up voted'
                }) 
            } else {
                song.save()
                res.json({
                    success:false,
                    message:' Song no longer exiset'
                })
            }
        }

    })
})


router.post('/voted/:id', checkJwt, (req,res,next) =>{

    let votantelId = req.decoded.user._id
    let songId = req.params.id

    Song.findOne({_id: songId},(err, songfond)=>{
        if (err) return next(err);
        if (songfond) {
            if (songfond.vote > 1) {
                songfond.vote = songfond.vote - 1
                songfond.votantelId.push(votantelId)
                songfond.save()
                res.json({
                    success:true,
                    message:'song is d voted'
                }) 
            }else{
                res.json({
                    success:false,
                    message:'songe vote is to lo allraedy'
                })
            }
        } else {
            res.json({
                success:false,
                message:' Song no longer exiset'
            })
        }
    })
})

function checkAvailability(arr, val) {
    return arr.some(function(arrVal) {
      return val === arrVal;
    });
}


module.exports = router