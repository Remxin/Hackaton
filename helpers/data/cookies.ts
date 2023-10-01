import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export function getCookieValue(req: NextApiRequest | NextRequest, cookieName: string) {
     //@ts-ignore
     const cookie = new Map(req.cookies._parsed).get(cookieName)

     if (!cookie) throw new Error("User not authenticated")
     //@ts-ignore
     return cookie.value
}