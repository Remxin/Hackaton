"use client";
import React, { useState } from "react";


// componenents
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

// icons
import { EyeFilledIcon } from "./EyeFilledIcon.js";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon.js";

// user context
import { useUserContext } from "@/contexts/UserContext";

// redirect
import { redirect } from 'next/navigation'

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { user, dispatch } = useUserContext();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const colors = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
  ];
  
  if (user.id) return redirect("/swipe")

  return (
    <div className="grid h-screen place-items-center">
      <Card>
        <CardHeader>Sign In</CardHeader>
        <CardBody>
          <Input
            className="mb-4"
            type="email"
            label="Email"
            placeholder="Enter your email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserData((p) => ({ ...p, email: e.target.value }))
            }
            color="primary"
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
          <Button
            onClick={() => dispatch.login(userData.email, userData.password)}
          >
            Login
          </Button>
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
}
