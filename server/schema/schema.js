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
    GraphQLID,
    GraphQLInt
} = graphql;

//Create dummy data
let books = [
    { name : 'Name of the Wind' , genre : 'Fantasy' , id : '1'},
    { name : 'The Final Empire' , genre : 'Fantasy' , id : '2'},
    { name : 'The Long Earth' , genre : 'Sci-Fi' , id : '3'}
];
let authors = [
    {name: 'Patrick Rothfuss', age: 44 , id : '1'},
    {name : 'Brandon Sanderson', age : 42 , id:'2'},
    {name : 'Terry Pratchett', age : 66 , id : '3'}
]
const BookType = new GraphQLObjectType({
   name : 'Book',
   fields : () => ({
       id: { type : GraphQLID},
       name : { type : GraphQLString},
       genre : {type : GraphQLString}
   })
});

const AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields : () =>({
        id: { type : GraphQLID},
        name : { type : GraphQLString},
        age : { type : GraphQLInt}
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
        },
        author : {
            type : AuthorType,
            args : {id : {type : GraphQLID}},
            resolve(parent , args){
                return _.find(authors, {id : args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});