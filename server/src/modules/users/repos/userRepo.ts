import { Repository } from '../../../shared/domain/Repository';
import { UniqueID } from '../../../shared/domain/UniqueID';

import { User, UserCollection } from '../domain/user';
import { UserMapper } from '../mapper/userMapper';

interface Pagination {
  _page: number;
  _perPage: number;
}

const DEFAULT_PAGINATION = {
  _page: 1,
  _perPage: 50
};

export class UserRepo extends Repository {
  public async search(
    query: string,
    pagination: Pagination = DEFAULT_PAGINATION
  ): Promise<UserCollection> {
    const { _page, _perPage } = pagination;
    const usersFound = await this.model.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            username: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      },
      skip: (_page - 1) * _perPage,
      take: _perPage
    });

    return usersFound.map((user) => UserMapper.toDomain(user));
  }

  public async findById(id: UniqueID): Promise<User> {
    const userFound = await this.model.user.findFirst({
      where: {
        id: id.value
      }
    });

    if (!!userFound) UserMapper.toDomain(userFound);

    return {} as User;
  }

  public async exists(id: UniqueID): Promise<boolean> {
    const userFound = await this.model.user.findFirst({
      where: {
        id: id.value
      }
    });
    return !!userFound;
  }

  public async save(user: User): Promise<void> {
    const userFound = await this.findById(user.id);
    const isUserExists = !!userFound;

    const userRaw = UserMapper.toPersistence(user);

    if (isUserExists) {
      await this.model.user.update({
        data: userRaw,
        where: {
          id: user.id.value
        }
      });
    } else {
      await this.model.user.create({
        data: {
          ...userRaw,
          password: 'secret'
        }
      });
    }
  }
}
