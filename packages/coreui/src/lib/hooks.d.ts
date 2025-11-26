import { type RefObject } from "react";
export declare function useOutsideClick<T extends HTMLElement>(callback: () => void): RefObject<T | null>;
