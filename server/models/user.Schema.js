const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        require: true,
        min: 2,
        max: 20
    }, 
    first_name: {
        type: String,
        trim: true,
        require: true,
        min: 2,
        max: 20
    },
    last_name: {
        type: String,
        trim: true,
        require: true,
        min: 2,
        max: 20
    },  
    email: {
        type: String,
        trim: true,
        required: true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter valid email'
        ],
        unique: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    phone_number: {
        type: String,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    },

    street: {type: String},
    apt_suite: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: Number, min: 5},


    role: {
        type: String,
        enum: ['client', 'admin', 'user']
    },
    clientID: {
        type: String,
    }

}, {timestamps: true})

UserSchema.pre('save', async function(){
    //generates random hashes data
    //combined hashed data with our password string to encrypt
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)