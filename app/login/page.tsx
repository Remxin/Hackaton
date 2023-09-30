"use client";
import React, { useState } from "react";
import { Checkbox, Spacer, Button, Link } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { EyeFilledIcon } from "./EyeFilledIcon.js";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon.js";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="grid h-screen place-items-center">
      <Card>
        <CardHeader>Sign In</CardHeader>
        <CardBody>
          <Input
            className="mb-2"
            type="email"
            label="Email"
            placeholder="Enter your email"
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
            className="max-w-xs"
          />
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
}
