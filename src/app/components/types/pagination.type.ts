export type PaginationType<T> = {
  [x: string]: any;
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  first: boolean;
  totalPages: number;
  totalElements: number;
  sort: {
    sorted: true;
    unsorted: boolean;
    empty: boolean;
  };
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
};

export type PaginationOptionType = {
  page: number;
  size: number;
};
