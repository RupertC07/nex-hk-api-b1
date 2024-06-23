import { hashSync } from "bcrypt";
import prisma from "../../utils/client";
import { z } from "zod";

class ChangePassword {
  static async execute(account_id: number, new_password: string) {
    const hashedPassword = hashSync(new_password, 10);

    const updatePassword = prisma.account.update({
      where: {
        id: account_id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return updatePassword;
  }

  static validate(data: {
    new_password: string;
    confirm_password: string;
    old_password: string;
  }) {
    const schema = z
      .object({
        new_password: z
          .string()
          .min(8, "New password must be at least 8 characters long"),
        confirm_password: z.string(),
        old_password: z.string(),
      })
      .refine((data) => data.new_password == data.confirm_password, {
        message: "New password and confirm password do not match",
        path: ["confirm_password"],
      })
      .refine((data) => data.new_password != data.old_password, {
        message: "New password cannot be the same as the old password",
        path: ["new_password"],
      });

    return schema.safeParse(data);
  }
}

export default ChangePassword;
