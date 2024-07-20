import { Campus } from "@prisma/client";
import prisma from "../../utils/client";
import { z } from "zod";

class CampusCreateAction {
    static async execute(
        data: Omit<Campus, 'id' | "created_at" | "updated_at" | "deleted_at">
    ) {
        return await prisma.campus.create({
            data,
        });
    }

    static validate(
        data: Omit<Campus, "id" | "created_at" | "updated_at" | "deleted_at">
    ) {
        const campusSchema = z.object({
            name: z.string().max(255),
            description: z.string().optional().nullable(),
            address: z.string().max(255),
            code: z.string().optional().nullable(),
        });

        return campusSchema.safeParse(data);
    }
}

export default CampusCreateAction;