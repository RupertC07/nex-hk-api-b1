import { Coordinator } from "@prisma/client";
import prisma from "../../utils/client";
import { z } from "zod";

class CoordinatorCreateAction {
    static async execute(
        data: Omit<Coordinator, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
    ) {
        return await prisma.coordinator.create({
            data,
        });
    }

    static validate(
        data: Omit<Coordinator, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
    ) {
        const coordinatorSchema = z.object({
            first_name: z.string().max(255),
            middle_name: z.string().optional().nullable(),
            last_name: z.string().max(255),
            birthdate: z.string().max(255),
            email: z.string().email(),
            contact_number: z.string().max(255),
            campus_id: z.number(),
            role: z.string().optional().nullable().default('coordinator'),
        });

        return coordinatorSchema.safeParse(data);
    }
}

export default CoordinatorCreateAction;
