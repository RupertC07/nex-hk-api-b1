import { now } from "lodash";
import prisma from "../../utils/client";
import { SemStatus } from "../../config/constants";

class DeactivateSemesterAction {
  static async execute() {
    const deactivate = await prisma.semester.updateMany({
      where: {
        status: SemStatus.Active,
        deleted_at: null,
      },
      data: {
        status: SemStatus.Inactive,
        updated_at: new Date(now()),
      },
    });
    return deactivate;
  }
}

export default DeactivateSemesterAction;
