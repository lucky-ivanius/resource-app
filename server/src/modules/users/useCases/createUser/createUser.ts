import { Response } from '../../../../shared/core/Response';
import { Result } from '../../../../shared/core/Result';
import { UseCase, UseCaseResult } from '../../../../shared/core/UseCase';
import { BadRequest } from '../../../../shared/core/UseCaseError';

import { UniqueID } from '../../../../shared/domain/UniqueID';

import { User } from '../../domain/user';

import { UserRepo } from '../../repos/userRepo';

import { CreateUserDTO } from './createUserDTO';

type PossibleError = BadRequest;

type CreateUserUseCaseInput = CreateUserDTO;
type CreateUserUseCaseOutput = Response<PossibleError, Result<User>>;

export class CreateUserUseCase
  implements UseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput>
{
  private readonly userRepo: UserRepo = new UserRepo();

  async execute(input: CreateUserDTO): Promise<CreateUserUseCaseOutput> {
    const id = new UniqueID();
    const userCreation = User.create(input, id);

    if (userCreation.isFailed)
      return UseCaseResult.fail(
        new BadRequest(userCreation.getError())
      ) as CreateUserUseCaseOutput;

    this.userRepo.save(userCreation.getValue());
    const createdUser = await this.userRepo.findById(id);

    return UseCaseResult.success(Result.ok(createdUser));
  }
}
