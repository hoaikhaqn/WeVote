export type IUser = {
  id: string
  name: string
  mode: UserMode
}

export enum UserMode {
  ANONYMOUS = "anonymous",
  IDENTIFIED = "identified"
}
