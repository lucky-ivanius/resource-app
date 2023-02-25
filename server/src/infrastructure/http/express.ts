import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { origin } from '../../config';

const expressServer = express();

function startExpress(apolloServer: ApolloServer) {
  expressServer.use(
    '/graphql',
    cors<cors.CorsRequest>(origin),
    bodyParser.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({
        token: req.headers.token
      })
    })
  );

  expressServer.use('*', (_, res) => {
    return res.redirect('/graphql');
  });
}

export { expressServer, startExpress };
