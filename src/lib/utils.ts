import { IUser, Permissions, UserMode } from "@/types/user"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createGuess = (): IUser => {
  const user = {
    id: new Date().getTime().toString(),
    name: "",
    mode: UserMode.ANONYMOUS,
    voted: {},
    permission: Permissions.GUESS
  }
  localStorage.setItem("poll_user_info", JSON.stringify(user))
  return user
}

export const getUserInfo = (): IUser => {
  if (typeof window !== "undefined") {
    if (!localStorage.getItem("poll_user_info")) {
      return createGuess()
    } else {
      return JSON.parse(localStorage.getItem("poll_user_info") || "{}")
    }
  }
  return { id: "", name: "", mode: UserMode.ANONYMOUS, permission: Permissions.GUESS }
}

export const changeUsername = (name:string) => {
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("poll_user_info") || "{}")
    user.name = name
    if(!name){
      user.mode = UserMode.ANONYMOUS
    }
    localStorage.setItem("poll_user_info", JSON.stringify(user))
  }
  return { id: "", name: "", mode: UserMode.ANONYMOUS, permission: Permissions.GUESS }
}

export const switchUserPermission = (permission:string) => {
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("poll_user_info") || "{}")
    user.permission = permission
    localStorage.setItem("poll_user_info", JSON.stringify(user))
  }
  return { id: "", name: "", mode: UserMode.ANONYMOUS, permission: Permissions.GUESS }
}


export const saveResultPolls = (pollId:string,option_number:number) => {
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("poll_user_info") || "{}")
    user.voted[pollId] = option_number
    localStorage.setItem("poll_user_info", JSON.stringify(user))
  }
  return { id: "", name: "", mode: UserMode.ANONYMOUS, permission: Permissions.GUESS }
}

export const getResultPolls = (pollId:string) => {
  return JSON.parse(localStorage.getItem("poll_user_info") || "{}")?.voted[pollId]
}

export const switchUserMode = (mode: UserMode) => {
  const self = getUserInfo()
  self.mode = mode
  localStorage.setItem("poll_user_info", JSON.stringify(self))
}

export const getOrdinalSuffix = (number: number) => {
  if (number === 1) {
    return number + "st"
  } else if (number === 2) {
    return number + "nd"
  } else if (number === 3) {
    return number + "rd"
  } else {
    return number + "th"
  }
}

const calculatePercent = (count: number, total: number, rouned: number = 0): number => {
  return parseInt(((count / total)* 100).toFixed(rouned))
}

export function getFirstAndLastLetters(str:string) {
  var words = str.split(" ");

  var firstWord = words[0];
  var lastWord = words.length > 1 ? words[words.length - 1] : "";

  var FirstWord = firstWord.charAt(0);
  var LastWord = lastWord.charAt(0);

  return `${FirstWord} ${LastWord}`;
}