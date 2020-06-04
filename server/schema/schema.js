/*In this file we define our schema  who is structured data
inside our graph
* 1.- Define types
* 2.Define relationships between types
* 3.Define root queries*/
const graphql = require('graphql');
const _ = require('lodash');
const Book = require('./../models/book');
const Author = require('./../models/author');

const {
    GraphQLObjectType ,
    GraphQLString ,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

//Create dummy data
/*let books = [
    { name : 'Name of the Wind' , genre : 'Fantasy' , id : '1', authorId : '1'},
    { name : '' , genre : 'Fantasy' , id : '2', authorId: '2'},
    { name : '' , genre : '' , id : '3' , authorId: '3'},
    { name : '' , genre : ' ' , id : '4' , authorId: '2'},
    { name : '' , genre : 'Fantasy' , id: '5' , authorId: '3'},
    { name : '' , genre : 'Fantasy' , id :'6' , authorId: '3'}

];

let authors = [
    {name: 'Patrick Rothfuss', age: 44 , id : '1'},
    {name : 'Brandon Sanderson', age : 42 , id:'2'},
    {name : 'Terry Pratchett', age : 66 , id : '3'}
];*/
const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : () => ({
        id: { type : GraphQLID},
        name : { type : GraphQLString},
        genre : {type : GraphQLString},
        authorId : {
            type : AuthorType,
            resolve(parent, args){
                //return _.find(authors, {id : parent.authorId})
            }
        }
    })
});
const AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields : () =>({
        id: { type : GraphQLID},
        name : { type : GraphQLString},
        age : { type : GraphQLInt},
        books : {
            type: new  GraphQLList( BookType ),
            resolve(parent, args){
                //return _.filter(books , {authorId : parent.id})
            }
        }
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

                // return _.find(books, {id : args.id});
            }
        },
        author : {
            type : AuthorType,
            args : {id : {type : GraphQLID}},
            resolve(parent , args){
               // return _.find(authors, {id : args.id})
            }
        },
        books : {
            type : new GraphQLList(BookType),
            resolve( parent, args){
             //   return books;
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve(parent, args){
                //return authors;
            }
        }
    }
})
const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addAuthor : {
            type : AuthorType,
            args : {
                name : { type : GraphQLString},
                age : { type : GraphQLInt}
            },
            resolve(parent,args){
                //Create a new instance our our data type
                const {name, age} = args;
                let  author = new Author({
                    name : name,
                    age : age
                    }
                )
              return  author.save();

            }
        },
        addBook : {
            type: BookType,
            args : {
                name : { type: GraphQLString},
                genre : { type: GraphQLString},
                authorId : { type: GraphQLID}
            },
            resolve(parent, args){
                const { name, genre, authorId} = args;
                let book = new Book({
                    name: name,
                    genre: genre,
                    authorId : authorId
                })
                return book.save();
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});