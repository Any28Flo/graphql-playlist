import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import BookList from './components/BookList'

//apollo client setup
const client = new ApolloClient({
    uri: process.env.URL
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
