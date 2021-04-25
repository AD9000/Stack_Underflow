import { createContext } from "react";
import { TagInfo } from "../Interfaces";

interface AuthContextType {
  auth: string | null;
  setAuth: Function;
}

const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
});

export { AuthContext };
