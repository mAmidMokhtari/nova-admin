export type UserName = {
  firstname: string;
  lastname: string;
};

/** User as shown in the panel. The API also returns address data that the panel does not use. */
export type User = {
  id: number;
  email: string;
  username: string;
  name: UserName;
  phone: string;
};

/** Request body of `POST /users`. */
export type CreateUserPayload = Omit<User, 'id'> & {
  password: string;
};

/** `POST /users` only echoes the generated id. */
export type CreateUserResponse = {
  id: number;
};

export type UserFormValues = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
};
