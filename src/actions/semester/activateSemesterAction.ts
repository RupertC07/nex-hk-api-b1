import { now } from "lodash";
import prisma from "../../utils/client";
import { SemStatus } from "@prisma/client";

class ActivateSemesterAction {
  static async execute(id: number) {
    return await prisma.semester.update({
      where: {
        id: id,
        deleted_at: null,
      },
      data: {
        status: SemStatus.Active,
        updated_at: new Date(now()),
      },
    });
  }
}

export default ActivateSemesterAction;
