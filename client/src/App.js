import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import {Container, Row, Col} from "react-bootstrap";
//Components
import BookList from './components/BookList'

//apollo client setup
const client = new ApolloClient({
    uri: process.env.REACT_APP_URL_API
});

export default App;

//Components
function App() {
    return (
        <ApolloProvider client={client}>
            <div className="main">
                <h2>Bienvenido a mi app libreria </h2>
                <BookList/>
            </div>
        </ApolloProvider>

);
}
