const {Schema , model} = require('mongoose')

const BazaShema = new Schema({
    title:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})




module.exports = model('book', BazaShema )