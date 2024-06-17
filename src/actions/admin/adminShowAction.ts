import prisma from "../../utils/client";

class AdminShowAction {
  static async execute(id: number) {
    const admin = await prisma.admin.findFirst({
      where: {
        id: id,
      },
      include: {
        account: {
          select: {
            trusted_devices: true,
          },
        },
      },
    });

    return admin;
  }
}

export default AdminShowAction;
