import { Result } from '../../../shared/core/Result';

import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueID } from '../../../shared/domain/UniqueID';

interface UserProps {
  name: string;
  username: string;
}

export type UserCollection = User[];

export class User extends AggregateRoot<UserProps> {
  get name(): string {
    return this._props.name;
  }

  get username(): string {
    return this._props.username;
  }

  private constructor(props: UserProps, id?: UniqueID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueID): Result<User> {
    const { name, username } = props;

    if (!name) return Result.fail<User>('Name is required');
    if (!username) return Result.fail<User>('Username is required');

    const userCreation = new User(props, id);

    return Result.ok<User>(userCreation);
  }
}
