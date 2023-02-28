import bcrypt from 'bcryptjs';
import { PrismaClient, User as Prisma__User } from '@prisma/client';

import { DEFAULT_PAGINATE, Page } from '../../../shared/core/Pagination';
import { Repository } from '../../../shared/domain/Repository';
import { UniqueID } from '../../../shared/domain/UniqueID';

import { User, UserCollection } from '../entity/user';
import { UserMapper } from '../mapper/userMapper';

type UserProjection = {
  [key in keyof Omit<Prisma__User, 'password'>]?: boolean;
};

const DEFAULT_USER_PROJECTION: UserProjection = {
  id: true,
  name: true,
  username: true
};

export class UserRepo extends Repository<PrismaClient> {
  public async search(
    query: string,
    pagination: Page = DEFAULT_PAGINATE,
    projection: UserProjection = DEFAULT_USER_PROJECTION
  ): Promise<UserCollection> {
    const { page, perPage } = pagination;
    const usersFound = await this._model.user.findMany({
      select: projection,
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
      skip: (page - 1) * perPage,
      take: perPage
    });

    return usersFound.map((user) => UserMapper.toDomain(user));
  }

  public async count(query: string): Promise<number> {
    const userCount = await this._model.user.count({
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
      }
    });

    return userCount;
  }

  public async findById(
    id: UniqueID,
    projection: UserProjection = DEFAULT_USER_PROJECTION
  ): Promise<User | null> {
    const userFound = await this._model.user.findFirst({
      select: projection,
      where: {
        id: id.value
      }
    });

    if (!!userFound) return UserMapper.toDomain(userFound);

    return null;
  }

  public async findByUsername(
    username: string,
    projection: UserProjection = DEFAULT_USER_PROJECTION
  ): Promise<User | null> {
    const userFound = await this._model.user.findFirst({
      select: projection,
      where: {
        username
      }
    });

    if (!!userFound) return UserMapper.toDomain(userFound);

    return null;
  }

  public async exists(id: UniqueID): Promise<boolean> {
    const userFound = await this._model.user.findFirst({
      select: { id: true },
      where: {
        id: id.value
      }
    });
    return !!userFound;
  }

  public async usernameExists(username: string): Promise<boolean> {
    const userFound = await this._model.user.findFirst({
      select: { id: true },
      where: {
        username
      }
    });
    return !!userFound;
  }

  private async generatePassword(password: string): Promise<string> {
    const generated = await bcrypt.hash(password, 8);
    return generated;
  }

  public async registerUser(user: User, password: string): Promise<void> {
    const generatedPassword = await this.generatePassword(password);

    const userRaw = UserMapper.toPersistence(user);

    await this._model.user.create({
      select: { id: true },
      data: {
        ...userRaw,
        password: generatedPassword
      }
    });
  }

  public async isValidPassword(
    id: UniqueID,
    password: string
  ): Promise<boolean> {
    const userFound = await this._model.user.findUnique({
      select: {
        password: true
      },
      where: {
        id: id.value
      }
    });
    if (!userFound) return false;

    const isValidPassword = await bcrypt.compare(password, userFound.password);
    return isValidPassword;
  }

  public async changePassword(
    id: UniqueID,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const isValidPassword = await this.isValidPassword(id, currentPassword);
    if (!isValidPassword) return;

    const generatedPassword = await this.generatePassword(newPassword);

    await this._model.user.update({
      select: { id: true },
      data: {
        password: generatedPassword
      },
      where: {
        id: id.value
      }
    });
  }
}
