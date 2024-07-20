import { SemStatus } from "../../config/constants";
import prisma from "../../utils/client";

class ShowActiveSemAction {
  static async execute() {
    return await prisma.semester.findFirst({
      where: {
        status: SemStatus.Active,
        deleted_at: null,
      },
    });
  }
}

export default ShowActiveSemAction;
