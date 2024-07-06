import prisma from "../../utils/client";

class ShowSemesterAction {
  static async execute(id: number) {
    return await prisma.semester.findFirst({
      where: {
        id: id,
        deleted_at: null,
      },
    });
  }
}

export default ShowSemesterAction;
