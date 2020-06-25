import React, {useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {Form,Dropdown} from "react-bootstrap";

const GET_AUTHORS= gql`
    {
        authors{
            id,
            name,
            age
        }
    }
`;
const AuthorList = ({onChange}) =>{
    const {loading, error, data} = useQuery(GET_AUTHORS);
    if(loading) return <option>Loading Authors....</option>
    if(error) return <p>Error x.X</p>

    function  handleChange(e){
       onChange(e)

    }
    return(
        <div className="authorList">
            <Form.Control
                as="select"
                name="authorName"
                onChange={handleChange}
            >
                {
                    data.authors.map((author,i) =>{
                        const {name,id} = author;
                        return(
                            <option name="authorName" key={i} value={id}>
                                {name}
                            </option>
                        )
                    })
                }
            </Form.Control>
        </div>
    );

};

export default AuthorList;