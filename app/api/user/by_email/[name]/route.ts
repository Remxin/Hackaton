
import { NextResponse } from "next/server";

import { getLastUrlPart } from "@/helpers/data/url";
import prisma from "@/lib/prisma";

// TODO: GET USER DATA
export async function GET(req: Request) {

    const email = getLastUrlPart(req.url)
    const result = await prisma.user.findFirst({ where: { email } })

    return NextResponse.json({ data: result }, { status: 200 })
}