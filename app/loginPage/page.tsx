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
      {/* <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">NextUI</p>
            <p className="text-small text-default-500">nextui.org</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            Visit source code on GitHub.
          </Link>
        </CardFooter>
      </Card> */}
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

      {/* <Card className="max-w-[400px]">
        <CardHeader>
          NextUI <Login></Login>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
          <Input type="email" label="Email" placeholder="Enter your email" />
          <Spacer y={1} />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
          />
          <Checkbox>Remember me</Checkbox>
          Forgot password?
          <Spacer y={1} />
        </CardBody>
        <CardFooter>
          <Button color="primary">Sign in</Button>
        </CardFooter>
      </Card> */}
    </div>
  );
}
