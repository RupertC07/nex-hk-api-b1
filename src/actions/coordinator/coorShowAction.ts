import prisma from "../../utils/client";

class CoordinatorShowAction {
    static async execute(id: number) {
        return await prisma.coordinator.findFirst({
            where: {
                id,
                deleted_at: null,
            },
        });
    }
}

export default CoordinatorShowAction;
