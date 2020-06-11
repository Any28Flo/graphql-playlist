import React, {useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {Form,Dropdown} from "react-bootstrap";

const GET_AUTHORS= gql`
    {
        authors{
            name,
            age
        }
    }
`;
const AuthorList = () =>{
    const [state , setState] = useState("");

    const {loading, error, data} = useQuery(GET_AUTHORS);
    if(loading) return <option>Loading Authors....</option>
    if(error) return <p>Error x.X</p>
    return(
        <div className="authorList">
            <Form.Control
                as="select"
                id="inlineFormCustomSelect"
                custom
                onChange={e => setState(e.target.value)}
            >
                {
                    data.authors.map((author,id) =>{
                        const {name} = author;
                        return(
                            <option key={id} value={name}>
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