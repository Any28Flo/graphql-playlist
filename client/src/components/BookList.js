import React, {useState} from "react";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton, Dropdown} from "react-bootstrap";
import { GET_BOOKS} from "../queries/queries";

const BookList = () =>{
    const { loading, error, data } = useQuery(GET_BOOKS);
    const [option, setOption] = useState('');

    if (loading) return <p data-testid="loading">Loading...</p>;
    if (error) return <p>Error :(</p>;
    return(
        <div className="bookList">
            <DropdownButton  id="books-dropdown" title="Books">
                {
                    data.books.map( (book, id) =>{
                        const {name} = book;
                        return(
                            <Dropdown.Item key= {id}>{name} value={name} onClick={e => setOption(e.value.target)}</Dropdown.Item>
                        )
                    })
                }
            </DropdownButton>

        </div>
    )
}
export  default BookList;