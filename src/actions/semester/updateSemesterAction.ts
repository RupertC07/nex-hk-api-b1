import { Semester } from "@prisma/client";
import prisma from "../../utils/client";
import { z } from "zod";

class UpdateSemesterAction {
  static async execute(
    id: number,
    data: Omit<Semester, "id" | "created_at" | "updated_at" | "deleted_at">
  ) {
    return await prisma.semester.update({
      where: {
        deleted_at: null,
        id: id,
      },
      data: {
        term: data.term,
        sy: data.sy,
      },
    });
  }
  static validate(
    data: Omit<Semester, "id" | "created_at" | "updated_at" | "deleted_at">
  ) {
    const schema = z.object({
      sy: z.string(),
      term: z.string(),
    });

    return schema.safeParse(data);
  }
  static async validSem(
    data: Omit<Semester, "id" | "created_at" | "updated_at" | "deleted_at">,
    id: number
  ) {
    const sem = await prisma.semester.findFirst({
      where: {
        deleted_at: null,
        sy: data.sy,
        term: data.term,
        id: {
          not: id,
        },
      },
    });
    return sem ? false : true;
  }
}
export default UpdateSemesterAction;
