import { hash, hashSync } from "bcrypt";
import { Transaction } from "kysely";
import kysely from "../../utils/kysely";

const adminSeeder = async () => {
  try {
    await kysely.transaction().execute(async (trx: any) => {
      const admin = await trx
        .insertInto("admin")
        .values({
          first_name: "John Doe",
          last_name: "Biden",
          email: "sample@email.com",
        })
        .returningAll()
        .executeTakeFirst();
      const password_admin = hashSync("password", 10);
      // const account = await trx
      //   .insertInto("admin_accounts")
      //   .values({
      //     admin_id: admin.id,
      //     password: password_admin,
      //   })
      //   .returningAll()
      //   .executeTakeFirst();

      return {
        admin,
        // account,
      };
    });

    return;
  } catch (error: unknown) {
    console.log(error);
  }
};

export default adminSeeder;
