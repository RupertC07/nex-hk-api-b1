// src/actions/DutyGetAction.ts
import prisma from "../../utils/client";
import { Duty } from "@prisma/client";

class DutyGetAction {
  static async execute(id: number): Promise<Duty | null> {
    const duty = await prisma.duty.findFirst({
      where: {
        deleted_at: null,
        id: id,
      },
    });
    return duty;
  }
}

export default DutyGetAction;
