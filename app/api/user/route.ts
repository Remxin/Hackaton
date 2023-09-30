import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";




// !TODO: delete this !!!!!!
export async function DELETE() {
    await prisma.user.deleteMany()
    return NextResponse.json({ status: "ok" }, { status: 200 })
}