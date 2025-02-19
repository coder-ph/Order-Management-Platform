import { createContext } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  // add states here
  return (
    <GlobalContext.Provider
      value={"pass the states here"}
    ></GlobalContext.Provider>
  );
}
