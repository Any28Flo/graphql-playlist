import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {DropdownButton,Dropdown} from "react-bootstrap";

const GET_AUTHORS= gql`
    {
        authors{
            name,
            age
        }
    }
`;
const AuthorList = () =>{
    const {loading, error, data} = useQuery(GET_AUTHORS);
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error x.X</p>
    return(
        <div className="authorList">
            <DropdownButton id="author-dropdown" title="Authors List">
                {
                    data.authors.map((author,id) =>{
                        const {name} = author;
                        return(
                            <Dropdown.Item key={id}>
                                {name}
                            </Dropdown.Item>
                        )
                    })
                }
            </DropdownButton>
        </div>
    )
};
export default AuthorList;