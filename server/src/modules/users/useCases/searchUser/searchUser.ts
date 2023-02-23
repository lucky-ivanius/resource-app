import { Response } from '../../../../shared/core/Response';
import { Result } from '../../../../shared/core/Result';
import { UseCase, UseCaseResult } from '../../../../shared/core/UseCase';
import { BadRequest } from '../../../../shared/core/UseCaseError';

import { UserCollection } from '../../domain/user';

import { UserRepo } from '../../repos/userRepo';

import { SearchUserDTO } from './searchUserDTO';

type PossibleError = BadRequest;

type SearchUserUseCaseInput = SearchUserDTO;
type SearchUserUseCaseOutput = Response<PossibleError, Result<UserCollection>>;

export class SearchUserUseCase
  implements UseCase<SearchUserUseCaseInput, SearchUserUseCaseOutput>
{
  private readonly userRepo: UserRepo = new UserRepo();

  async execute(input: SearchUserDTO): Promise<SearchUserUseCaseOutput> {
    const { query, pagination } = input;

    const usersFound = await this.userRepo.search(query, pagination);

    return UseCaseResult.success(Result.ok(usersFound));
  }
}
