import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { httpServer } from '../http/http';

const typeDefs = `
  type User {
    id: ID
    name: String
    username: String
  }

  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: () => []
  }
};

interface Context {
  token?: string | string[];
}

const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

async function startApollo(server: ApolloServer<Context>) {
  await server.start();
}

export { apolloServer, startApollo, Context };
