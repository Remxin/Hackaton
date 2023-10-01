import { NextApiRequest } from "next";

export function getCookieValue(req: NextApiRequest, cookieName: string) {
     //@ts-ignore
     const cookie = new Map(req.cookies._parsed).get(cookieName).value

     return cookie
}