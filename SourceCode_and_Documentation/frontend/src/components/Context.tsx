import React from "react";

interface AppContextType {
  open: boolean;
  setOpen: Function;
}

const AppContext = React.createContext<AppContextType>({
  open: false,
  setOpen: () => {},
});

export { AppContext };
