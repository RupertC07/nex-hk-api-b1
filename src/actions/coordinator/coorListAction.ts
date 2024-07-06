import prisma from "../../utils/client";

class CoordinatorListAction {
    static async execute() {
        return await prisma.coordinator.findMany({
            where: {
                deleted_at: null,
            },
        });
    }
}

export default CoordinatorListAction;
