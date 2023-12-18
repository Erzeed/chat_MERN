import {createContext, useEffect, useState} from "react";
import getApi from "../utils/api";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const resp = await getApi.getProfile();
      setId(resp.userId);
      setUsername(resp.username);
    }
    getData();
  }, []);
  return (
    <UserContext.Provider value={{username, setUsername, id, setId}}>
      {children}
    </UserContext.Provider>
  );
}