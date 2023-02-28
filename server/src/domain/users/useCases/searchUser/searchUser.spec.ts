import { PrismaClient } from '@prisma/client';
import { Pagination } from '../../../../shared/core/Pagination';

import { UserCollection } from '../../entity/user';
import { UserMapper } from '../../mapper/userMapper';
import { UserRepo } from '../../repos/userRepo';

import { SearchUserUseCase } from './searchUser';

beforeEach(() => {
  jest.clearAllMocks();
});

const TOTAL_USER = 20;

const users = Array.from({ length: TOTAL_USER }, (_, i) =>
  UserMapper.toDomain({
    id: `${i}`,
    name: `user ${i}`,
    username: `user${i}`,
    createdAt: new Date(),
    updatedAt: new Date()
  })
);

describe('Use Case: search user', () => {
  const userRepo = new UserRepo(new PrismaClient());
  const searchUserUseCase = new SearchUserUseCase(userRepo);

  it('should return users with a pagination', async () => {
    const PER_PAGE = 10;

    const mockSearch = jest
      .spyOn(UserRepo.prototype, 'search')
      .mockImplementation(async () => {
        return users.slice(0, PER_PAGE);
      });

    const mockCount = jest
      .spyOn(UserRepo.prototype, 'count')
      .mockImplementation(async () => {
        return TOTAL_USER;
      });

    const args = {
      query: ''
    };
    const pagination = {
      page: 1,
      perPage: PER_PAGE
    };

    const searchUser = await searchUserUseCase.execute({ args, pagination });

    expect(mockSearch).toHaveBeenCalled();
    expect(mockCount).toHaveBeenCalled();

    expect(searchUser.isSuccess()).toBeTruthy();

    const result = searchUser.result;

    expect(result.isSuccess).toBeTruthy();
    expect((result.getValue().data as UserCollection).length).toBe(PER_PAGE);
    expect(result.getValue().pagination as Pagination).toEqual({
      total: TOTAL_USER,
      totalPage: 2,
      ...pagination
    });
  });
});
