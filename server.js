const express = require('express');
const app = express();


require('dotenv').config();
const logger = require('morgan');
app.use(logger('dev'));


const local_db = process.env.LOCAL_DB_URI;
const mongoose = require('mongoose');
 mongoose.connect(local_db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("mongoose db connected!")
}).catch((err)=>{
  console.log("mongoose db connection error: " + err);
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const routes = require('./routes')
app.use('/api', routes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server successfully started on port ${port}`)
});
