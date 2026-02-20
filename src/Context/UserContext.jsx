import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [userLongin, setUserLogin] = useState(
    localStorage.getItem("user Token")
      ? localStorage.getItem("user Token")
      : null,
  );

  return (
    <UserContext.Provider value={{ userLongin, setUserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
