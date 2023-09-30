"use client";
import React, { useState } from "react";
// import { Checkbox, Spacer, Button, Link } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { EyeFilledIcon } from "./EyeFilledIcon.js";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon.js";
import { Button } from "@nextui-org/button";

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
          />
          <Input
            className="mb-2"
            type="email"
            label="Email"
            placeholder="Enter your email"
            color="primary"
          />
          <Input
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
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
          <Button color="primary">Register</Button>
        </CardBody>
      </Card>
    </div>
  );
}
