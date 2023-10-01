"use client";
import React, { use, useState } from "react";
import { Input } from "@nextui-org/input";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { EyeFilledIcon } from "./EyeFilledIcon.js";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon.js";
import { Button } from "@nextui-org/button";
import { useUserContext } from "@/contexts/UserContext";
import { appConstants } from "@/constants/app";
import { httpresponseType } from "@/types/api";
import { userClientType } from "@/types/dbModels";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const colors = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
  ];
  const router = useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [userName, setUserName] = useState("");

  const sendRegisterToBackend = async (email: string, password: string) => {
    console.log("rejestracja");
    try {
      const res = await fetch(`${appConstants.appIP}/api/user/register`, {
        method: "POST",
        body: JSON.stringify({ email, password, userName }),
      });

      const resData: httpresponseType<userClientType & { token: string }> =
        await res.json();
      if (resData.status === "failed") {
        const error = resData.error;
        return;
      }
      const { name, id } = resData.data;
      console.log(resData.data);
    } catch (err) {
      console.log(err);
      return;
    }
  };
  const registerUser = async () => {
    console.log("register user");
    sendRegisterToBackend(userData.email, userData.password);
    router.push("/login");
  };

  return (
    <div className="grid h-screen place-items-center">
      <Card>
        <CardHeader>Sign Up</CardHeader>
        <CardBody>
          <Input
            className="mb-2"
            label="Name"
            placeholder="Enter your name"
            color="primary"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
          />
          <Input
            className="mb-2"
            type="email"
            label="Email"
            placeholder="Enter your email"
            color="primary"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserData((p) => ({ ...p, email: e.target.value }))
            }
          />
          <Input
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserData((p) => ({ ...p, password: e.target.value }))
            }
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xs mb-2"
          />
          <Divider className="mb-2" />
          <Button onClick={registerUser} color="primary">
            Register
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
