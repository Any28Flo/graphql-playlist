require('dotenv').config();
const express = require('express');
const graphlHTTP = require('express-graphql');

const app = express();

app.use('/graphql' , graphlHTTP({

}));
const port = `${process.env.PORT}`

app.listen(port , () =>{
    console.log(`Server running on port ${port}`)
})