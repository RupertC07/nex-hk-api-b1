import { now } from "lodash";
import prisma from "../../utils/client";

class DeleteSemesterAction {
  static async execute(id: number) {
    return await prisma.semester.update({
      where: {
        id: id,
      },
      data: {
        status: "inactive",
        deleted_at: new Date(now()),
      },
    });
  }
}

export default DeleteSemesterAction;
