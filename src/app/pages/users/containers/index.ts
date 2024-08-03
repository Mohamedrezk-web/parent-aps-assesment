import { AddUserComponent } from '@app/pages/users/containers/add-user/add-user.component';
import { UpdateUserComponent } from '@app/pages/users/containers/update-user/update-user.component';
import { UserDetailsComponent } from '@app/pages/users/containers/user-details/user-details.component';

export * from '@app/pages/users/containers/add-user/add-user.component';
export * from '@app/pages/users/containers/update-user/update-user.component';
export * from '@app/pages/users/containers/user-details/user-details.component';

export const USERS_CONTAINERS = [
  AddUserComponent,
  UpdateUserComponent,
  UserDetailsComponent,
];
