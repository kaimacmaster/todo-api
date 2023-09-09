// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Todo" type defines the queryable fields for every todo in our data source.
  type Todo {
    id: ID
    title: String
    completed: Boolean
    details: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "todos" query returns an array of zero or more Todos (defined above).
  type Query {
    todos: [Todo]
  }
`;

const todos = [
  {
    id: "980179287350987",
    title: "Take out the trash",
    completed: true,
    details: "I know it's a lot of trash, but you can do it!",
    author: "androidguykai@gmail.com",
  },
  {
    id: "980179287351124",
    title: "Code an API",
    completed: false,
    details: "For the todo app, it'll be great!",
    author: "androidguykai@gmail.com",
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves todos from the "todos" array above.
const resolvers = {
  Query: {
    todos: () => todos,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server);

console.log(`🚀  Server ready at: ${url}`);
