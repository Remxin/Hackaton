import React from "react";
// http
import { NextResponse } from "next/server";

// prisma
import prisma from "@/lib/prisma";

// types
import { httpresponseType } from "@/types/api";
import { universityDBType } from "@/types/dbModels";

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type ScoreRequestBody = {
  userId: any;
  score: number;
  universityId: string;
  studyPathId: string;
};

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // if (req.method !== "POST") {
//   //   res.status(405).json({ error: "Method not allowed" });
//   //   return;
//   // }

//   const { userId, score, universityId, studyPathId } =
//     req.body as ScoreRequestBody;

//   if (!userId || !score) {
//     res.status(400).json({ error: "Bad request body" });
//     return;
//   }

//   try {
//     // const user = await prisma.user.findUnique({ where: { id: userId } });

//     // if (!user) {
//     //   res.status(404).json({ error: "User not found" });
//     //   return;
//     // }

//     const newScore = await prisma.studyPathOpinion.create({
//       data: {
//         stars: score,
//         userId: userId,
//         comment: "",
//         studyPathId: "",
//         universityId: universityId,
//       },
//     });

//     res.status(201).json({ data: newScore });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   } finally {
//     await prisma.$disconnect();
//   }
// }

export async function POST(req: Request) {
  // const data = await res.json();

  const { userId, score, universityId, studyPathId } = await req.json();

  try {
    const newScore = await prisma.studyPathOpinion.create({
      data: {
        stars: score,
        userId: userId,
        comment: "",
        studyPathId: "06d3b7c7-8063-4359-9bfb-5015c31f1b3f",
        universityId: universityId,
      },
    });
  } catch (err) {
    console.error(err);
    return new Response("err", {
      status: 501,
    });
  } finally {
    // return new Response({Message: "Success"}, {
    //   status: 200,
    // });
    return NextResponse.json({ Message: "Success" }, { status: 200 });
    await prisma.$disconnect();
  }
  // return Response.json(data);
}
