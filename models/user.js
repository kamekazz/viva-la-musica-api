const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs')
const crypto =require('crypto')

const UserSchema = new Schema({
    userName:{type:String,unique:true,lowercase:true},
    password:String,
    created: {type:Date, default: Date.now},
})





UserSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();
    
    bcrypt.hash(user.password, null,null,(err,hash)=>{
        if (err) return next(err)
            
        user.password = hash;
        next()
    })
    
})

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}



module.exports = mongoose.model('User',UserSchema)