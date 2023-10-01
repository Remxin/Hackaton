import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

// prisma
import prisma from "@/lib/prisma";

// helpers
import { getCookieValue } from "@/helpers/data/cookies";

// types
import { httpresponseType } from "@/types/api";
import { studyPathDBType } from "@/types/dbModels";

export async function GET(req: NextApiRequest) {
    let res: httpresponseType<studyPathDBType[]> = { status: "ok", data: []}
    const userToken = getCookieValue(req, "user_token") as string

    try {
        // TODO: recommendation ALGORITHM
        const paths = await prisma.studyPath.findMany({ take: 20, include: { department: { include: { university: { select: { name: true, id: true}}} }}} )
        //@ts-ignore
        res.data = paths

        return NextResponse.json(res, { status: 200 })
    } catch (err) {
        res = { status: "failed", error: "Internal server error"}
        return NextResponse.json(res, { status: 500})
    }
    
}