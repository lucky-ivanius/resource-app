import { User as Prisma__User } from '@prisma/client';
import { UniqueID } from '../../../shared/domain/UniqueID';
import { User } from '../entity/user';

type UserObjectProps = {
  [key in keyof Omit<Prisma__User, 'password'>]?: Prisma__User[key];
};

export class UserMapper {
  public static toDomain(user: UserObjectProps): User {
    const userCreation = User.create(
      {
        name: user.name as string,
        username: user.username as string
      },
      new UniqueID(user.id)
    );

    if (userCreation.isFailed) return {} as User;

    const userDomain = userCreation.getValue();

    return userDomain;
  }

  public static toPersistence(user: User) {
    const userRaw = {
      id: user.id.value,
      name: user.name,
      username: user.username
    };

    return userRaw;
  }
}
