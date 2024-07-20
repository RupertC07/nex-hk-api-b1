import { now } from "lodash";
import prisma from "../../utils/client";
import { SemStatus } from "../../config/constants";

class DeleteSemesterAction {
  static async execute(id: number) {
    return await prisma.semester.update({
      where: {
        id: id,
      },
      data: {
        status: SemStatus.Inactive,
        deleted_at: new Date(now()),
      },
    });
  }
}

export default DeleteSemesterAction;
