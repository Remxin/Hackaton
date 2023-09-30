import { NextResponse } from "next/server";

import { getLastUrlPart } from "@/helpers/data/url";

// TODO: GET USER DATA
export async function GET(req: Request) {

    const userId = getLastUrlPart(req.url)
    

    return NextResponse.json({ status: "ok"}, { status: 200})
}