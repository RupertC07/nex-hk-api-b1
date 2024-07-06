import prisma from "../../utils/client";

class CoordinatorDeleteAction {
    static async execute(id: number) {
        const coordinator = await prisma.coordinator.findUnique({
            where: { id },
        });

        if (!coordinator || coordinator.deleted_at) {
            return null;
        }

        return await prisma.coordinator.update({
            where: { id },
            data: { deleted_at: new Date() },
        });
    }
}

export default CoordinatorDeleteAction;
