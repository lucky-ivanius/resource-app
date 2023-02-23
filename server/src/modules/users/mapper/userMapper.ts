import { UniqueID } from '../../../shared/domain/UniqueID';
import { User } from '../domain/user';

export class UserMapper {
  public static toDomain(user: Record<string, unknown>): User {
    const userCreation = User.create(
      {
        name: user.name as string,
        username: user.username as string
      },
      new UniqueID(user.id as string)
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
