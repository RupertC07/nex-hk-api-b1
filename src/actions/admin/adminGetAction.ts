import prisma from "../../utils/client";

class AdminGetAction {
  static async execute(id?: number | null, email?: string | null) {
    const where = id ? { id: id } : { email: email };
    const admin = await prisma.admin.findFirst({
      where,
      include: {
        account: {
          include: {
            trusted_devices: true,
          },
        },
      },
    });
    return admin;
  }
}

export default AdminGetAction;
