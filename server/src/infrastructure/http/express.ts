import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { origin } from '../../config';

import { prisma, Context } from '../db/prisma';
import { typeDefs, resolvers } from '../graphql/apollo-server';

const PORT = 4000;

interface Server {
  express: express.Express;
  http: http.Server;
  apollo: ApolloServer<Context>;
}

async function startServer(server: Server) {
  const { express, http, apollo } = server;

  await apollo.start();

  express.use(
    '/graphql',
    cors<cors.CorsRequest>(origin),
    bodyParser.json(),
    expressMiddleware(apollo, {
      context: async ({ req }) => ({
        token: req.headers.token,
        prisma
      })
    })
  );

  express.use('*', (_, res) => {
    return res.redirect('/graphql');
  });

  http.listen({ port: PORT }, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${PORT}/`);
  });
}

const expressServer = express();
const httpServer = http.createServer(expressServer);
const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

startServer({
  express: expressServer,
  http: httpServer,
  apollo: apolloServer
});
