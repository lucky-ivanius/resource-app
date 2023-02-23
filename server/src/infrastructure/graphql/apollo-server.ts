import { prisma } from '../db/prisma';

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
    users: () => {
      return prisma.user.findMany();
    }
  }
};

export { typeDefs, resolvers };
