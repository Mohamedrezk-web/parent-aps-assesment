import { User } from './users.model';

export interface GetUserApiResponse {
  data: User;
  support: {
    url: string;
    test: string;
  };
}
