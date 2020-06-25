import {gql} from "apollo-boost"

const GET_BOOKS = gql`
    {
        books{
            name,
            genre
        }

    }
`;

const GET_AUTHORS= gql`
    {
        authors{
            id,
            name,
            age
        }
    }
`;
const ADD_BOOK = gql`
   mutation {
        addBook(name: "", genre:"" , authorId:""){
            id
            name
        }
    }
`;
export {GET_BOOKS, GET_AUTHORS,ADD_BOOK}