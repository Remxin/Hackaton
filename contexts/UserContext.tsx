import React, { createContext, useState, useContext, useEffect } from "react";
import { userClientType } from "@/types/dbModels";

// constants
import { appConstants } from "@/constants/app";

// types
import { httpresponseType } from "@/types/api";

// cookies
import { useCookies } from "react-cookie";

// router
import { usePathname } from "next/navigation";

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
  const pathname = usePathname()

  const [userData, setUserData] = useState<userClientType>({
    id: "",
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  async function login(email: string, password: string) {
    setLoading(true)
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
      setLoading(false)
    } catch (err) {
      setErrors((e) => [...e, "Application error"]);
      setLoading(false)
      return;
    }
  }

  async function verify() {
    setLoading(true)
    try {
      const res = await fetch(`${appConstants.appIP}/api/user/verify`, {
        method: "POST",
        credentials: "include"
      })

      const resData = await res.json()

    } catch (err) {
      console.log(err)
      setErrors((e) => [...e, "Application error"]);
      setLoading(false)
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
