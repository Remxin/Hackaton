// server
import { NextResponse } from "next/server";

// prisma
import prisma from "@/lib/prisma";

// hash
import { hashHelpers } from "@/helpers/data/hashHelpers";

// types
import { httpresponseType } from "@/types/api";
import { userClientType, userDBType } from "@/types/dbModels";

type registerBody = {
  userName: string;
  email: string;
  password: string;
};

export async function POST(req: Request) {
  let res: httpresponseType<userClientType> = {
    status: "ok",
    data: { id: "", name: "", email: "" },
  };

  const body: registerBody = await req.json();

  if (!body.email || !body.password || !body.userName) {
    res = { status: "failed", error: "Bad request body" };
    return NextResponse.json(res, { status: 400 });
  }
  const { email, password, userName } = body;

  try {
    const hashedPass = await hashHelpers.hashPass(password);
    if (hashedPass.status === "failed")
      throw new Error("Password hashing do not work");

    const user = await prisma.user.create({
      //@ts-ignore
      data: { email, password: hashedPass.data, name: userName },
    });
    if (!user) {
      res = { status: "failed", error: "User not found" };
      return NextResponse.json(res, { status: 404 });
    }

    res.data = { name: user.name, email: user.email, id: user.id };
    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    res = { status: "failed", error: "Server error" };
    return NextResponse.json(res, { status: 500 });
  }
}
