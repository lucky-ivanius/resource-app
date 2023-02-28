import { prisma } from '../../../infrastructure/db/prisma';

import { UserRepo } from '../repos/userRepo';

import { CreateUserUseCase } from './createUser/createUser';
import { SearchUserUseCase } from './searchUser/searchUser';

const userRepo = new UserRepo(prisma);

const createUserUseCase = new CreateUserUseCase(userRepo);
const searchUserUseCase = new SearchUserUseCase(userRepo);

export { createUserUseCase, searchUserUseCase };
