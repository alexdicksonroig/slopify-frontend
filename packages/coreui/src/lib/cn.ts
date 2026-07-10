import { twMerge } from "tailwind-merge";

type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined;
type ClassDictionary = Record<string, unknown>;
type ClassArray = ClassValue[];

function toVal(mix: ClassValue): string {
  let str = "";

  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (mix && typeof mix === "object") {
    if (Array.isArray(mix)) {
      for (const item of mix) {
        if (item) {
          const value = toVal(item);
          if (value) {
            if (str) str += " ";
            str += value;
          }
        }
      }
    } else {
      for (const key in mix) {
        if (mix[key]) {
          if (str) str += " ";
          str += key;
        }
      }
    }
  }

  return str;
}

function clsx(...inputs: ClassValue[]): string {
  let str = "";
  for (const input of inputs) {
    if (input) {
      const value = toVal(input);
      if (value) {
        if (str) str += " ";
        str += value;
      }
    }
  }
  return str;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
