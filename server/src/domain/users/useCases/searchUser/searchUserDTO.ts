import { Paginate, WithPagination } from '../../../../shared/core/Pagination';
import { SearchQuery } from '../../../../shared/core/Query';

import { UserCollection } from '../../entity/user';

export type SearchUserInputDTO = Paginate<SearchQuery>;

export type SearchUserOutputDTO = WithPagination<UserCollection>;
