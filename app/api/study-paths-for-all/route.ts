import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import { getCookieValue } from "@/helpers/data/cookies";
import { httpresponseType } from "@/types/api";
import { studyPathDBType } from "@/types/dbModels";

export async function GET() {
  let res: httpresponseType<studyPathDBType[]> = { status: "ok", data: [] };

  try {
    const studyPaths = await prisma.studyPath.findMany({
      include: {
        department: {
          include: { university: { select: { name: true, id: true } } },
        },
      },
    });
    //@ts-ignore
    res.data = studyPaths;
    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    res = { status: "failed", error: "Internal server error" };
    return NextResponse.json(res, { status: 500 });
  }
  return NextResponse.json({ message: "success" }, { status: 200 });
}
