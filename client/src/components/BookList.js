import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton, Dropdown} from "react-bootstrap";

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

    if (loading) return <p data-testid="loading">Loading...</p>;
    if (error) return <p>Error :(</p>;

    return(
        <div className="bookList">
            <DropdownButton  id="books-dropdown" title="Books">
                {
                    data.books.map( (book, id) =>{
                        const {name} = book;
                        return(
                            <Dropdown.Item key= {id}>{name}</Dropdown.Item>
                        )
                    })
                }
            </DropdownButton>

        </div>
    )
}
export  default BookList;