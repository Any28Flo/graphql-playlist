/*In this file we define our schema*/
/*Schema is where we define who is structured the data inside
* our graph*/
const graphql = require('graphql');

const { GraphQLObjectType , GraphQLString} = graphql;

const BookType = new GraphQLObjectType({
   name : 'Book',
   fields : () => ({
       id: { type : GraphQLString},
       name : { type : GraphQLString},
       genre : {type : GraphQLString}
   })
});