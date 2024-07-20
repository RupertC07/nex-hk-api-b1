import { now } from "lodash";
import prisma from "../../utils/client";

class ActivateSemesterAction {
  static async execute(id: number) {
    return await prisma.semester.update({
      where: {
        id: id,
        deleted_at: null,
      },
      data: {
        status: "active",
        updated_at: new Date(now()),
      },
    });
  }
}

export default ActivateSemesterAction;
