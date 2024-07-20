"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const client_1 = __importDefault(require("../../utils/client"));
const adminSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
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
        yield client_1.default.$transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
            yield trx.admin.create({
                data: {
                    first_name: "John", // Replace with actual first name
                    last_name: "Doe", // Replace with actual last name
                    email: "rupertcaingal.dev@gmail.com",
                    account: {
                        create: {
                            password: (0, bcrypt_1.hashSync)("password", 10), // Hashed password
                        },
                    },
                },
            });
        }));
        return;
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = adminSeeder;
//# sourceMappingURL=adminSeeder.js.map