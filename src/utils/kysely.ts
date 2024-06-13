import { DB } from "../types/db_types";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import config from "../config";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: config.db.connection_string,
  }),
});

const kyselyClientSingleton = (): Kysely<DB> => {
  return new Kysely<DB>({
    dialect,
  });
};

type KyselyClientSingleton = ReturnType<typeof kyselyClientSingleton>;

const globalForKy = globalThis as unknown as {
  kysely: KyselyClientSingleton | undefined;
};

const kysely = globalForKy.kysely ?? kyselyClientSingleton();

export default kysely;
