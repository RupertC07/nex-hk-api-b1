import { Coordinator } from "@prisma/client";
import prisma from "../../utils/client";
import { z } from "zod";

class CoordinatorUpdateAction {
    static async execute(
        id: number,
        data: Partial<Omit<Coordinator, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>>
    ) {
        return await prisma.coordinator.update({
            where: { id },
            data,
        });
    }

    static validate(
        data: Partial<Omit<Coordinator, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>>
    ) {
        const coordinatorSchema = z.object({
            first_name: z.string().max(255).optional(),
            middle_name: z.string().optional().nullable(),
            last_name: z.string().max(255).optional(),
            birthdate: z.string().max(255).optional(),
            email: z.string().email().optional(),
            contact_number: z.string().max(255).optional(),
            campus_id: z.number().optional(),
            role: z.string().optional().nullable().default('coordinator'),
        });

        return coordinatorSchema.safeParse(data);
    }
}

export default CoordinatorUpdateAction;
