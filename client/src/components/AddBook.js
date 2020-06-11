import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form ,Button} from "react-bootstrap";

import AuthorList from "./AuthorList";
const AddBook = () =>{
    const [formState , setFormState] = useState({
       bookName : '',
       genre : '',
       authorName : ''
    });
    const handleFormSubmit = e =>{
        e.preventDefault();
        console.log("Enviando form");
    }
    const handleChange = e =>{
      console.log("evente");
      const {name, value} = e.target;
      setFormState(Object.assign({}, formState, {[name]: value}));
    };
    return (
        <div className="addBook">
            <Form onSubmit ={handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control  name="bookName" placeholder="Book name"  onChange={ e => handleChange(e)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Genre</Form.Label>
                    <Form.Control name="genre" placeholder="Genre" onChange={e => handleChange(e)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Author:</Form.Label>
                    <AuthorList/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
export default AddBook;