import { createContext, useContext } from "react";

export function createStrictContext<T>() {
  const Context = createContext<T | undefined>(undefined);

  function useStrictContext() {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error("useStrictContext must be used within a Provider");
    }
    return context;
  }

  return [useStrictContext, Context] as const;
}
