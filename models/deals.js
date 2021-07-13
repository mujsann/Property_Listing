const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deal_schema = new Schema({
  price: {
    type:Number,
    required:true
  },
  postal_code: {
    type:String,
    required:true
  },
  refurb: {
    type:Number,
    required:true
  },
  date:{
    type:Date,
    Default:Date.now()
  }
})



module.exports = Deal = mongoose.model('deal', deal_schema);
