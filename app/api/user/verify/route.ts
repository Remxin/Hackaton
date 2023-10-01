// server
import { NextResponse } from "next/server";

// prisma
import prisma from "@/lib/prisma";

// hash
import { hashHelpers } from "@/helpers/data/hashHelpers";

// token
import { signUserToken, verifyUserToken } from "@/helpers/data/token";
import { getCookieValue } from "@/helpers/data/cookies";

// types
import { httpresponseType } from "@/types/api";
import { userClientType } from "@/types/dbModels";
import { NextApiRequest } from "next";

type loginBody = {
  email: string;
  password: string;
};

export async function POST(req: NextApiRequest) {
  let res: httpresponseType<userClientType & { token: string }> = {
    status: "ok",
    data: { id: "", name: "", email: "", token: "" },
  };

  const cookie = getCookieValue(req, "user_token")
  const token = verifyUserToken(cookie)
  console.log(token)

  return NextResponse.json({ message: "ok" }, { status: 200 })
  // 
  // try {
  //   const user = await prisma.user.findUnique({ where: { email } });
  //   if (!user) {
  //     res = { status: "failed", error: "User not found" };
  //     return NextResponse.json(res, { status: 404 });
  //   }

  //   console.log("jest");
  //   const token = await signUserToken({ id: user.id }, "5d");
  //   console.log(token);

  //   res.data = { name: user.name, email: user.email, id: user.id, token };
  //   return NextResponse.json(res, { status: 200 });
  // } catch (err) {
  //   res = { status: "failed", error: "Internal server error" };
  //   console.log(err);
  //   return NextResponse.json(res, { status: 500 });
  // }
}
