import { pageInit } from '../../../../shared/core/Pagination';
import { Output } from '../../../../shared/core/Output';
import { Result } from '../../../../shared/core/Result';
import { UseCase, UseCaseResult } from '../../../../shared/core/UseCase';
import { BadRequest } from '../../../../shared/core/UseCaseError';

import { UserRepo } from '../../repos/userRepo';

import { SearchUserInputDTO, SearchUserOutputDTO } from './searchUserDTO';

type PossibleError = BadRequest;

type SearchUserUseCaseInput = SearchUserInputDTO;
type SearchUserUseCaseOutput = Output<
  PossibleError,
  Result<SearchUserOutputDTO>
>;

export class SearchUserUseCase
  implements UseCase<SearchUserUseCaseInput, SearchUserUseCaseOutput>
{
  constructor(private readonly _userRepo: UserRepo) {}

  async execute(input: SearchUserInputDTO): Promise<SearchUserUseCaseOutput> {
    const { args, pagination } = input;

    const users = await this._userRepo.search(args.query, pagination);
    const userCount = await this._userRepo.count(args.query);

    const result: SearchUserOutputDTO = {
      data: users,
      pagination: pageInit(pagination?.page, pagination?.perPage, userCount)
    };

    return UseCaseResult.success(Result.ok(result));
  }
}
