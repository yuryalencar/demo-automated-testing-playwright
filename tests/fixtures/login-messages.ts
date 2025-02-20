export interface LoginMessages {
  [key: string]: string;
}

export const LOGIN_MESSAGES: LoginMessages = {
  lockedOutUserMessage: "Epic sadface: Sorry, this user has been locked out.",
  invalidCredentialsMessage: "Epic sadface: Username and password do not match any user in this service",
};
