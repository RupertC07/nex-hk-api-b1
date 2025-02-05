import prisma from "../../utils/client";

class CoordinatorDeleteAction {
    static async execute(id: number) {
        return await prisma.coordinator.update({
            where: {
                id
            },
            data: {
                deleted_at: new Date()
            },
        });
    }
}

export default CoordinatorDeleteAction;
