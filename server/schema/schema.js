/*In this file we define our schema  who is structured data
inside our graph
* 1.- Define types
* 2.Define relationships between types
* 3.Define root queries*/
const graphql = require('graphql');

const { GraphQLObjectType , GraphQLString , GraphQLSchema} = graphql;

const BookType = new GraphQLObjectType({
   name : 'Book',
   fields : () => ({
       id: { type : GraphQLString},
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
            args : { id : { type : GraphQLString}},
            resolve ( parent , args){
                // Code to get data from db / other source

            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery
});