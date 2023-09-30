// server
import { NextResponse } from "next/server";

// prisma
import prisma from "@/lib/prisma";

// hash
import { hashHelpers } from "@/helpers/data/hashHelpers";

// types
import { httpresponseType } from "@/types/api";
import { userClientType } from "@/types/dbModels";

type loginBody = {
    email: string
    password: string
}

export async function POST(req: Request) {
    let res: httpresponseType<userClientType> = { status: "ok", data: { id: "", name: "", email: ""}}

    const body: loginBody = await req.json()

    if (body.email || body.password) {
        res = { status: "failed", error: "Bad request body"}
        return NextResponse.json(res, { status: 400 })
    }
    
    // const isPasswordValidate = await hashHelpers.comparePass()


}