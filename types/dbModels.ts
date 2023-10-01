import prisma from "@/lib/prisma";
import { PrismaClient, Prisma } from "@prisma/client";

export type userDBType = {
  id: string;
  name: string;
  password: string;
  email: string;
  opinions?: studyPathOpinionDBType;
  maturaScore?: maturaScoreDBType[];
};
export type userClientType = Omit<userDBType, "password">;

export type maturaScoreDBType = {
  id: string;
  subjectName: string;
  parcent: number;
  userId: string;
  user?: userClientType;
};

export type universityDBType = {
  id: string;
  name: string;
};

export type departmentDBType = {
  id: string;
  name: string;
  description: string;
  universityId: string;
  university?: universityDBType;
};

export type studyPathDBType = {
  id: string;
  name: string;
  description: string;
  departmentId: string;
  department?: departmentDBType;
  studyPathOpinions?: studyPathOpinionDBType[];
  categoryId: string;
  category?: categoryDBType;
};

export type studyPathOpinionDBType = {
  id: string;
  stars: number;
  comment: string;
  userId: string;
  user?: userDBType;
  studyPathId: string;
  studyPath?: studyPathDBType;
};

export type categoryDBType = {
  id: string;
  name: string;
  studyPath: studyPathDBType[];
};
