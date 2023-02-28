import { z } from 'zod';

import { Result } from '../../../shared/core/Result';

import { Entity } from '../../../shared/domain/Entity';
import { UniqueID } from '../../../shared/domain/UniqueID';

const zUser = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string'
    })
    .min(3, 'Name must contain at least 3 characters'),
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string'
    })
    .min(3, 'Username must contain at least 3 characters')
});

type UserProps = z.infer<typeof zUser>;

export type UserCollection = User[];

export class User extends Entity<UserProps> {
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
    const validUser = zUser.safeParse(props);

    if (!validUser.success) {
      return Result.fail<User>(
        validUser.error.issues.map((issue) => issue.message)
      );
    }

    const userCreation = new User(props, id);

    return Result.ok<User>(userCreation);
  }
}
