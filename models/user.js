const moongose = require('mongoose');

const userSchema = new moongose.Schema({

    name:{
        type: String,
        required: true,
    },
    email:{
        type : String,
        required:true,
        unique: true,
    },
    role:{
        type : String,
        required:true,
        default:"NORMAL",
    },
    password:{
        type : String,
        required:true
    }

},{timestamps:true});

const User = moongose.model('User', userSchema);

module.exports = User;