// src/actions/DutyDeleteAction.ts
import prisma from "../../utils/client";
import { now } from "lodash";

class DutyDeleteAction {
  static async execute(id: number) {
    return await prisma.duty.update({
      where: {
        id: id,
      },
      data: {
        deleted_at: new Date(now()),
      },
    });
  }
}

export default DutyDeleteAction;
