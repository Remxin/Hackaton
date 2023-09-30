import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import { getCookieValue } from "@/helpers/data/cookies";
import { httpresponseType } from "@/types/api";
import { studyPathDBType } from "@/types/dbModels";

export async function GET(req: NextApiRequest) {
    let res: httpresponseType<studyPathDBType[]> = { status: "ok", data: []}
    const userToken = getCookieValue(req, "user_token")

    try {

    } catch (err) {
        res = { status: "failed", error: "Internal server error"}
        return NextResponse.json(res, { status: 500})
    }
    return NextResponse.json({ message: "success" }, { status: 200 })
}