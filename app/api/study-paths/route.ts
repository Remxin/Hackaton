import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

// prisma
import prisma from "@/lib/prisma";

// helpers
import { getCookieValue } from "@/helpers/data/cookies";

// token
import { verifyUserToken, userTokenType } from "@/helpers/data/token";

// types
import { httpresponseType } from "@/types/api";
import { studyPathDBType } from "@/types/dbModels";

export async function GET(req: any) {
    let res: httpresponseType<studyPathDBType[]> = { status: "ok", data: [] }




    try {
        const userToken = getCookieValue(req, "user_token") as string
        console.log('idzie')

        // user auth
        const verify = verifyUserToken(userToken) as userTokenType
        console.log(verify)
        if (!verify?.id) {
            res = { status: "failed", error: "User not authenticated" }
            return NextResponse.json(res, { status: 403 })
        }
        // TODO: recommendation ALGORITHM

        const paths = await prisma.studyPath.findMany({ include: { department: { include: { university: { select: { name: true, id: true } } } } } })
        //@ts-ignore
        res.data = paths

        return NextResponse.json(res, { status: 200 })
    } catch (err: any) {
        console.log(err.message)
        if (err.message === "User not authenticated") {
            res = { status: "failed", error: "User not authenticated" }
            return NextResponse.json(res, { status: 403 })
        }
        res = { status: "failed", error: "Internal server error" }
        return NextResponse.json(res, { status: 500 })
    }

}