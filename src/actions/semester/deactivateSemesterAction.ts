import { now } from "lodash";
import prisma from "../../utils/client";

class DeactivateSemesterAction {
  static async execute() {
    const deactivate = await prisma.semester.updateMany({
      where: {
        status: "active",
        deleted_at: null,
      },
      data: {
        status: "inactive",
        updated_at: new Date(now()),
      },
    });
    return deactivate;
  }
}

export default DeactivateSemesterAction;
