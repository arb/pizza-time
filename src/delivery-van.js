import graphqlFetch from 'graphql-fetch';
// Make this a singleton because I don't want other consumers to have to know this
// It's weird the library is this way
export default graphqlFetch('https://core-graphql.dev.waldo.photos/pizza');
