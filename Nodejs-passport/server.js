const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path:'./.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        // useCreateIndex: true,
        // useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log('Connection DB successfuly'));


const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Server is runing on port ${port}...`);
})