import { Campus } from "@prisma/client";
import prisma from "../../utils/client";
import { z } from "zod";

class CampusUpdateAction {
    static async execute(
        id: number,
        data: Partial<Omit<Campus, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>>
    ) {
        return await prisma.campus.update({
            where: { id },
            data,
        });
    }

    static validate(
        data: Partial<Omit<Campus, "id" | "created_at" | "updated_at" | "deleted_at">>
    ) {
        const campusSchema = z.object({
            name: z.string().max(255).optional(),
            description: z.string().optional().nullable(),
            address: z.string().max(255).optional(),
            code: z.string().optional().nullable(),
        });

        return campusSchema.safeParse(data);
    }
}

export default CampusUpdateAction;
