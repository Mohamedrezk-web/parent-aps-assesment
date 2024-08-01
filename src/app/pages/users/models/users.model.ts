export interface User {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface GetUsersApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    test: string;
  };
}
