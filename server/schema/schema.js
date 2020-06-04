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
    GraphQLList,
    GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : () => ({
        id: { type : GraphQLID},
        name : { type : GraphQLString},
        genre : {type : GraphQLString},
        author : {
            type : AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId);
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
                return Book.find({authorId: parent.id})
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
                return Book.findById(args.id)
            }
        },
        author : {
            type : AuthorType,
            args : {id : {type : GraphQLID}},
            resolve(parent , args){
                return Author.findById(args.id)
            }
        },
        books : {
            type : new GraphQLList(BookType),
            resolve( parent, args){
                return Book.find({})
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({})
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
                name : { type :  new GraphQLNonNull(GraphQLString)},
                age : { type : new GraphQLNonNull( GraphQLInt)}
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
                name : { type: new GraphQLNonNull(GraphQLString)},
                genre : { type: new GraphQLNonNull(GraphQLString)},
                authorId : { type: new GraphQLNonNull(GraphQLID)}
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