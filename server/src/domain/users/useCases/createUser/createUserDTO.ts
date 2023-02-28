import { User } from '../../entity/user';

type UserProps = Pick<User, 'name' | 'username'> & { password: string };

export type CreateUserInputDTO = UserProps;

export type CreateUserOutputDTO = User;
