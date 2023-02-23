interface Pagination {
  _page: number;
  _perPage: number;
}

export interface SearchUserDTO {
  query: string;
  pagination?: Pagination;
}
