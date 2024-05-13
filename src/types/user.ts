export type IUser = {
  id: string
  name: string
  mode: UserMode
  permission: Permissions
}

export enum UserMode {
  ANONYMOUS = "anonymous",
  IDENTIFIED = "identified"
}

export enum Permissions {
  ADMIN = "admin",
  GUESS = "guess"
}