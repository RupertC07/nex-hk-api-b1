import { Duty } from "@prisma/client";
import prisma from "../../utils/client";
import { z } from "zod";

class DutyCreateAction {
  static async execute(
    data: Omit<Duty, "id" | "created_at" | "updated_at" | "deleted_at">
  ) {
    const duty = await prisma.duty.create({
      data,
    });

    return duty;
  }
  static validate(
    data: Omit<Duty, "id" | "created_at" | "updated_at" | "deleted_at">
  ) {
    const schema = z.object({
      name: z.string().max(255),
      description: z.string().max(500),
      required_hours: z.number(),
    });

    return schema.safeParse(data);
  }

  static async validDuty(name: string) {
    const duty = await prisma.duty.findFirst({
      where: {
        deleted_at: null,
        name: name,
      },
    });
    return duty ? false : true;
  }
}

export default DutyCreateAction;
