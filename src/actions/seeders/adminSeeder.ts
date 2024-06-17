import { hash, hashSync } from "bcrypt";
import { Transaction } from "kysely";
import kysely from "../../utils/kysely";
import prisma from "../../utils/client";

const adminSeeder = async () => {
  try {
    // await kysely.transaction().execute(async (trx: any) => {
    //   const admin = await trx
    //     .insertInto("admin")
    //     .values({
    //       first_name: "John Doe",
    //       last_name: "Biden",
    //       email: "rupertcaingal.dev@gmail.com",
    //     })
    //     .returningAll()
    //     .executeTakeFirst();
    //   const password_admin = hashSync("password", 10);
    //   const account = await trx
    //     .insertInto("account")
    //     .values({
    //       admin_id: admin.id,
    //       password: password_admin,
    //     })
    //     .returningAll()
    //     .executeTakeFirst();

    //   return {
    //     admin,
    //     account,
    //   };
    // });

    await prisma.$transaction(async (trx) => {
      await trx.admin.create({
        data: {
          first_name: "John", // Replace with actual first name
          last_name: "Doe", // Replace with actual last name
          email: "rupertcaingal.dev@gmail.com",
          account: {
            create: {
              password: hashSync("password", 10), // Hashed password
            },
          },
        },
      });
    });

    return;
  } catch (error: unknown) {
    console.log(error);
  }
};

export default adminSeeder;
