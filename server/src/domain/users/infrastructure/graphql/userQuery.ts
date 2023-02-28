import { Context } from '../../../../infrastructure/graphql/Context';

interface SearchUserQuery {
  query: string;
}

export function getUserQuery(
  _: never,
  args: SearchUserQuery,
  context: Context,
  info: unknown
) {
  return {
    args,
    context,
    info
  };
}
