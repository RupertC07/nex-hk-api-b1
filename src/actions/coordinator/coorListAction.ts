import prisma from "../../utils/client";

class CoordinatorListAction {
    static async execute(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const [coordinators, total] = await Promise.all([
            await prisma.coordinator.findMany({
                where: {
                    deleted_at: null,
                },
                skip,
                take: pageSize
            }),
            prisma.campus.count({
                where: {
                    deleted_at: null,
                }
            })
        ])
        return { coordinators, total }

    }
}

export default CoordinatorListAction;
