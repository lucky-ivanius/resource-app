import { apolloServer, startApollo } from '../graphql/apollo-server';
import { startExpress } from './express';
import { startHttp } from './http';

const PORT = 4000;

async function startServer() {
  await startApollo(apolloServer);
  startExpress(apolloServer);
  startHttp(PORT);
}

export { startServer };
