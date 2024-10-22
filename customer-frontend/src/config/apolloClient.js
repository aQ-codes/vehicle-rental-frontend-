import { ApolloClient, InMemoryCache } from '@apollo/client';
import  createUploadLink  from 'apollo-upload-client/createUploadLink.mjs';

const apolloClient = new ApolloClient({
    link: createUploadLink({
        uri: 'http://localhost:8080/graphql',
    }),
    cache: new InMemoryCache(),
});

export default apolloClient;
    