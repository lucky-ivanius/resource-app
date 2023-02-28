export interface Page {
  page: number;
  perPage: number;
}

export interface Pagination {
  total: number;
  page: number;
  perPage: number;
  totalPage: number;
}

export interface Paginate<T> {
  args: T;
  pagination?: Page;
}

export interface WithPagination<T> {
  data: T;
  pagination: Pagination;
}

export const DEFAULT_PAGINATE: Page = {
  page: 1,
  perPage: 50
};

export function pageInit(page?: number, perPage?: number, total?: number) {
  const _page = page ?? DEFAULT_PAGINATE.page;
  const _perPage = perPage ?? DEFAULT_PAGINATE.perPage;
  const _total = total ?? 0;

  return {
    page: _page,
    perPage: _perPage,
    total: _total,
    totalPage: Math.ceil(_total / _perPage)
  };
}
