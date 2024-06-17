import { Admin } from "@prisma/client";
import prisma from "../../utils/client";
import { z } from "zod";

class AdminUpdateAction {
  static async execute(
    data: Omit<Admin, "id" | "created_at" | "updated_at" | "role">,
    id: number
  ) {
    return await prisma.admin.update({
      where: {
        id: id,
      },
      data,
    });
  }
  static validate(
    data: Omit<Admin, "id" | "created_at" | "updated_at" | "role">
  ) {
    const adminSchema = z.object({
      first_name: z.string().max(255),
      last_name: z.string(),
      email: z.string().email(),
      birthdate: z.string().optional().nullable(),
      contact_number: z.string().optional().nullable(),
    });

    return adminSchema.safeParse(data);
  }
}

export default AdminUpdateAction;
