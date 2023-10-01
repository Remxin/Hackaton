// server
import { NextRequest, NextResponse } from "next/server";

// prisma
import prisma from "@/lib/prisma";

// hash
import { hashHelpers } from "@/helpers/data/hashHelpers";

// token
import { signUserToken, verifyUserToken, userTokenType } from "@/helpers/data/token";
import { getCookieValue } from "@/helpers/data/cookies";

// types
import { httpresponseType } from "@/types/api";
import { userClientType } from "@/types/dbModels";
import { NextApiRequest } from "next";

type loginBody = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  let res: httpresponseType<userClientType> = {
    status: "ok",
    data: { id: "", name: "", email: "" },
  };


  try {
    const cookie = getCookieValue(req, "user_token")
    const token = verifyUserToken(cookie) as userTokenType

    const user = await prisma.user.findUnique({ where: { id: token.id } });
    if (!user) {
      res = { status: "failed", error: "User not found" };
      return NextResponse.json(res, { status: 404 });
    }


    res.data = { name: user.name, email: user.email, id: user.id };
    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    res = { status: "failed", error: "Internal server error" };
    console.log(err);
    return NextResponse.json(res, { status: 500 });
  }
}
