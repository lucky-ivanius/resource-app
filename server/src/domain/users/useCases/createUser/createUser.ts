import { Output } from '../../../../shared/core/Output';
import { Result } from '../../../../shared/core/Result';
import { UseCase, UseCaseResult } from '../../../../shared/core/UseCase';
import { BadRequest } from '../../../../shared/core/UseCaseError';

import { UniqueID } from '../../../../shared/domain/UniqueID';

import { User } from '../../entity/user';

import { UserRepo } from '../../repos/userRepo';

import { CreateUserInputDTO, CreateUserOutputDTO } from './createUserDTO';

type PossibleError = BadRequest;

type CreateUserUseCaseInput = CreateUserInputDTO;
type CreateUserUseCaseOutput = Output<
  PossibleError,
  Result<CreateUserOutputDTO>
>;

export class CreateUserUseCase
  implements UseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput>
{
  constructor(private readonly _userRepo: UserRepo) {}

  async execute(input: CreateUserInputDTO): Promise<CreateUserUseCaseOutput> {
    const id = new UniqueID();
    const userCreation = User.create(input, id);

    if (userCreation.isFailed)
      return UseCaseResult.fail(
        new BadRequest(userCreation.getError())
      ) as CreateUserUseCaseOutput;

    const isUsernameExists = await this._userRepo.usernameExists(
      input.username
    );
    if (isUsernameExists)
      return UseCaseResult.fail(
        new BadRequest('Username already exists.')
      ) as CreateUserUseCaseOutput;

    await this._userRepo.registerUser(userCreation.getValue(), input.password);
    const createdUser = (await this._userRepo.findById(id)) as User;

    return UseCaseResult.success(Result.ok(createdUser));
  }
}
