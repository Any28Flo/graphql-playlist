import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_BOOKS = gql`
    {
        books{
            name,
            genre
        }
    
    }
`;

const BookList = () =>{
    const { loading, error, data } = useQuery(GET_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return(
        <div className="bookList">
            <h1>BookList</h1>
            <ul>
                {
                    data.books.map( (book, id) =>{
                        const {name} = book;
                        return(
                         <li key= {id}>{name}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export  default BookList;