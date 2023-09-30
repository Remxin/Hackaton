// http
import { NextResponse } from "next/server";

// prisma
import prisma from "@/lib/prisma";

// types
import { httpresponseType } from "@/types/api";
import { universityDBType } from "@/types/dbModels";

type createUniversityBodyType = {
    name: string
}


export async function GET() { // get all universities
    let res: httpresponseType<universityDBType[] | null> = { status: "ok", data: null}

    try {
        const universities = await prisma.university.findMany()
        res.data = universities
        return NextResponse.json(res, { status: 200 })
    } catch (err) {
        res = { status: "failed", error: "Internal server error"}
        return NextResponse.json(res, { status: 200 })
    }
}

export async function POST(req: Request) {
    let res: httpresponseType<universityDBType | null> = { status: "ok", data: null}
    let body: createUniversityBodyType = await req.json()

    if (!body.name) {
        res = { status: "failed", error: "Bad request body" }
        return NextResponse.json(res, { status: 400 })
    }

    try {
        const { name } = body
        const university = await prisma.university.create({ data: { name }})
        res.data = university

        return NextResponse.json(res, { status: 200 })
    } catch (err) {
        res = { status: "failed", error: "Internal server error" }
        return NextResponse.json(res, { status: 500 })
    }
}

// ! TODO: delete this on deploy
export async function DELETE() {
    await prisma.university.deleteMany()
    return NextResponse.json({ message: "successfully deleted" }, { status: 200 })

}