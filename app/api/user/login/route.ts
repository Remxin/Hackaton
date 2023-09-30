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


    if (!body.email || !body.password) {
        res = { status: "failed", error: "Bad request body"}
        return NextResponse.json(res, { status: 400 })
    }
    const { email, password } = body
    try {
        const user = await prisma.user.findUnique({ where: { email }})
        console.log(user)
        if (!user) {
            res = { status: "failed", error: "User not found"}
            return NextResponse.json(res, { status: 404 })
        }
    
        const isPasswordValidate = await hashHelpers.comparePass(user.password, password)
        if (isPasswordValidate.status === "failed") {
            res = { status: "failed", error: "Passwords do not match" }
            return NextResponse.json(res, { status: 403})
        }
        
        res.data = { name: user.name, email: user.email, id: user.id}
        return NextResponse.json(res, { status: 200})

    } catch (err) {
        res = { status: "failed", error: "Internal server error"}
        return NextResponse.json(res, { status: 500 })
    }



}