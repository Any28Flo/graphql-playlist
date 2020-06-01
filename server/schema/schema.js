/*In this file we define our schema  who is structured data
inside our graph
* 1.- Define types
* 2.Define relationships between types
* 3.Define root queries*/
const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType ,
    GraphQLString ,
    GraphQLSchema,
    GraphQLID
} = graphql;

//Create dummy data
let books = [
    { name : 'Name of the Wind' , genre : 'Fantasy' , id : '1'},
    { name : 'The Final Empire' , genre : 'Fantasy' , id : '2'},
    { name : 'The Long Earth' , genre : 'Sci-Fi' , id : '3'}
]
const BookType = new GraphQLObjectType({
   name : 'Book',
   fields : () => ({
       id: { type : GraphQLID},
       name : { type : GraphQLString},
       genre : {type : GraphQLString}
   })
});
/*This is how we jump into the graph*/
const RootQuery = new GraphQLObjectType({
    name :'RootQueryType',
    fields : {
        book: {
            type : BookType,
            args : { id : { type : GraphQLID}},
            resolve ( parent , args){
                // Code to get data from db / other source

                return _.find(books, {id : args.id});
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery
});