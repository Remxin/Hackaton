import { NextResponse } from "next/server";

import { getLastUrlPart } from "@/helpers/data/url";
import { httpresponseType } from "@/types/api";
import { universityDBType } from "@/types/dbModels";
import prisma from "@/lib/prisma";

// TODO: GET USER DATA
export async function GET(req: Request) {
    const userId = getLastUrlPart(req.url)
    let res: httpresponseType<universityDBType[] | null> = { status: "ok", data: null}

    try {
        const user = await prisma.user.findUnique({where:{id: userId}, include: {maturaScore: true}})
        //@ts-ignore
        res.data = user
        return NextResponse.json(res, { status: 200 })
    } catch (err) {
        console.log(err)
        res = { status: "failed", error: "Internal server error"}
        return NextResponse.json(res, { status: 200 })
    }

}

export async function PATCH(req: Request) {
    const userId = getLastUrlPart(req.url)
    let res: httpresponseType<universityDBType[] | null> = { status: "ok", data: null}

    try {
        const user = await prisma.user.findUnique({where:{id: userId}, include: {maturaScore: true}})
        console.log(await prisma.maturaScore.deleteMany({ where: { userId }}))
        let data: {name: string, percent: string}[] = await req.json()
        for (let x of data){
            const exam = await prisma.maturaScore.create({data: {subjectName: x.name,percent:+x.percent,userId }})

        }
        //@ts-ignore
        res.data = user
        return NextResponse.json(res, { status: 200 })
    } catch (err) {
        console.log(err)
        res = { status: "failed", error: "Internal server error"}
        return NextResponse.json(res, { status: 200 })
    }

}