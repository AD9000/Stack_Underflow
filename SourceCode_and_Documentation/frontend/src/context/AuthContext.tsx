import { createContext } from "react";

interface AuthContextType {
  auth: string | null;
  setAuth: Function;
}

const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
});

export { AuthContext };
