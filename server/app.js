require('dotenv').config();
const express = require('express');
const graphlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const port = `${process.env.PORT}`

const app = express();

mongoose.connect(`${process.env.DB_CONECTION}` ,  {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open' , () =>{
    console.log("Conection to the database sucess");
})

app.use(cors({
    credentials : true,
    origin: ['http://localhost:3000']
}));

app.use('/graphql' , graphlHTTP({
    schema,
    graphiql: true
}));

app.listen(port , () =>{
    console.log(`Server running on port ${port}`)
})