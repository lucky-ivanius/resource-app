import http from 'http';
import { expressServer } from './express';

const httpServer = http.createServer(expressServer);

function startHttp(port: number) {
  httpServer.listen({ port }, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${port}/`);
  });
}

export { httpServer, startHttp };
