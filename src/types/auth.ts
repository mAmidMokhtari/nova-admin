export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

/** What the panel keeps about the signed-in admin. */
export type Session = {
  token: string;
  username: string;
};
