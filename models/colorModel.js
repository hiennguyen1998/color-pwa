const moongose = require('mongoose')

const colorSchema = new moongose.Schema({
    name:{
        type: String,
        required: [true,"Color must have name"]
    },
    hexCode:{
        type: String,
        required: [true,"Color must have hex code"]
    },
    desc:{
        type: String,
        required:[true,"Color must have description"]
    }
},{
    strictQuery:'throw'
})

const Color = moongose.model('Color', colorSchema)

module.exports = Color