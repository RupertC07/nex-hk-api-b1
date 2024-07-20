import prisma from "../../utils/client";

class ShowActiveSemAction {
  static async execute() {
    return await prisma.semester.findFirst({
      where: {
        status: "active",
        deleted_at: null,
      },
    });
  }
}

export default ShowActiveSemAction;
