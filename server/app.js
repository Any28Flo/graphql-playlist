require('dotenv').config();
const express = require('express');
const graphlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const port = `${process.env.PORT}`

const app = express();

app.use('/graphql' , graphlHTTP({
    schema,
    graphiql: true
}));

app.listen(port , () =>{
    console.log(`Server running on port ${port}`)
})