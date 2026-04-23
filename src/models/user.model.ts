export interface User {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type UserDto = Pick<User, "email"> & {password?: string};
