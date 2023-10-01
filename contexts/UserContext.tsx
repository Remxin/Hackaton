import React, { createContext, useState, useContext } from "react";
import { userClientType } from "@/types/dbModels";

// constants
import { appConstants } from "@/constants/app";

// types
import { httpresponseType } from "@/types/api";

// cookies
import { useCookies } from "react-cookie";
import { calculateSeconds } from "@/helpers/data/dates";

// types
type ContextType = {
  user: userClientType;
  loading: boolean;
  errors: string[];
  dispatch: {
    login: (email: string, password: string) => Promise<void>;
  };
} | null;

type ProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

// context creation
export const UserContext = createContext<ContextType>(null);

// context Provider
export default function UserContextProvider({ children }: ProviderProps) {
  const [cookies, setCookie] = useCookies();
  const [userData, setUserData] = useState<userClientType>({
    id: "",
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  async function login(email: string, password: string) {
    console.log(email, password);
    // return
    let token = "";
    try {
      const res = await fetch(`${appConstants.appIP}/api/user/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const resData: httpresponseType<userClientType & { token: string }> =
        await res.json();
      if (resData.status === "failed") {
        const error = resData.error;
        setErrors((e) => [...e, error]);
        return;
      }
      const { name, id } = resData.data;
      token = resData.data.token;
      setUserData({ name, email, id });
      setCookie("user_token", token);
      setCookie("user_email", email);
    } catch (err) {
      setErrors((e) => [...e, "Application error"]);
      return;
    }
  }

  return (
    <UserContext.Provider
      value={{
        user: userData,
        loading,
        errors,
        dispatch: {
          login,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const contextVals = useContext(UserContext);
  if (typeof contextVals === null || !contextVals?.dispatch)
    throw new Error(
      "This custom hook can be used only inside provider children"
    );

  return { ...contextVals };
}
