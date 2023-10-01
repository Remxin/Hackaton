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

// redirect
import { redirect } from 'next/navigation'

export default function Login() {
  const { user, dispatch } = useUserContext()
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);



  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });
 
  const registerUser = async () => {
    dispatch.register(userData.email, userData.name, userData.password)
  };

  if (user.id) return redirect("/swipe")

  return (
    <div className="grid h-screen place-items-center">
      <Card>
        <CardHeader>Sign Up</CardHeader>
        <CardBody>
          <Input
            className="mb-4"
            label="Name"
            placeholder="Enter your name"
            color="primary"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserData((p) => ({ ...p, name: e.target.value }))
            }
          />
          <Input
            className="mb-4"
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
            className="max-w-xs mb-4"
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
