"use client";
import React, { useEffect, useState } from "react";
import { Checkbox, Spacer, Button, Link } from "@nextui-org/react";

import { Input } from "@nextui-org/input";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { EyeFilledIcon } from "./EyeFilledIcon.js";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon.js";
import { useUserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation.js";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })
  const { dispatch, user, loading } = useUserContext()
  const router = useRouter()

  //await for user change
  useEffect(() => {
    if (user.name === '') return
    router.push('./matches')
  }, [user])

  const toggleVisibility = () => setIsVisible(!isVisible);
  const colors = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
  ];


  return (
    <div className={"grid h-screen place-items-center cursor-wait" + (loading ? ' cursor-wait' : '')}>
      <Card>
        <CardHeader>Sign In</CardHeader>
        <CardBody>
          <Input
            className={"mb-2" + (loading ? ' cursor-wait' : '')}
            type="email"
            label="Email"
            placeholder="Enter your email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData(p => ({ ...p, email: e.target.value }))}
            color="primary"
          />
          <Input
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData(p => ({ ...p, password: e.target.value }))}
            endContent={
              <button
                className={"focus:outline-none" + (loading ? ' cursor-wait' : '')}
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

            className={"max-w-xs" + (loading ? ' cursor-wait' : '')}
          />
          <Button onClick={() => dispatch.login(userData.email, userData.password)} className={(loading ? ' cursor-wait' : '')}>
            Login
          </Button>
        </CardBody>
        <Divider />
      </Card>
      <button className="hover:text-gray-500 text-gray-900" onClick={() => router.push('./register')}>register first</button>

    </div>
  );
}
