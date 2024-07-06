import { Semester } from "@prisma/client";
import prisma from "../../utils/client";
import { z } from "zod";

class SemesterCreateAction {
  static async execute(
    data: Omit<Semester, "id" | "created_at" | "updated_at" | "deleted_at">
  ) {
    const semester = await prisma.semester.create({
      data,
    });

    return semester;
  }
  static validate(
    data: Omit<Semester, "id" | "created_at" | "updated_at" | "deleted_at">
  ) {
    const schema = z.object({
      sy: z.string(),
      term: z.string(),
      status: z.string(),
    });

    return schema.safeParse(data);
  }

  static async validSem(
    data: Omit<Semester, "id" | "created_at" | "updated_at" | "deleted_at">
  ) {
    const sem = await prisma.semester.findFirst({
      where: {
        deleted_at: null,
        sy: data.sy,
        term: data.term,
      },
    });
    return sem ? false : true;
  }
}

export default SemesterCreateAction;
