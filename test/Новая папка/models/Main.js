const {Schema , model} = require('mongoose')

const BaseSchema = new Schema ({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    img:{
        type:String,
        required:true
    },

})

module.exports = model('book', BaseSchema )
