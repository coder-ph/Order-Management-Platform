import { createContext } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  // add states here
  const [data, setData] = useState([])
  return (
    <GlobalContext.Provider
      value={{data, setData,handlesub}}
    >{children} </GlobalContext.Provider>
  );
}
