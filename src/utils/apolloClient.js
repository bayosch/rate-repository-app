import ApolloClient from 'apollo-boost';

const createApolloClient = () => new ApolloClient({
    uri: 'http://10.197.190.94:4000/graphql'
});
export default createApolloClient;