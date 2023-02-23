import { PrismaClient } from '@prisma/client';

import { prisma } from '../../infrastructure/db/prisma';

export abstract class Repository {
  protected readonly model: PrismaClient = prisma;
}
