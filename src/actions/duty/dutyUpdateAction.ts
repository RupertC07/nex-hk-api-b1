import { Duty } from "@prisma/client";
import prisma from "../../utils/client";
import { z } from "zod";
import { now } from "lodash";

class DutyUpdateAction {
  static async execute(
    data: Omit<Duty, "id" | "created_at" | "updated_at" | "deleted_at">,
    id: number
  ) {
    const updatedDuty = await prisma.duty.update({
      where: {
        deleted_at: null,
        id: id,
      },
      data: {
        name: data.name,
        description: data.description,
        required_hours: data.required_hours,
        updated_at: new Date(now()),
      },
    });
    return updatedDuty;
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

  static async validDuty(name: string, id: number) {
    const duty = await prisma.duty.findFirst({
      where: {
        deleted_at: null,
        name: name,
        id: {
          not: id,
        },
      },
    });
    return duty ? false : true;
  }
}

export default DutyUpdateAction;
