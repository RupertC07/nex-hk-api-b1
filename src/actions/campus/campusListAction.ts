import prisma from "../../utils/client";

class CampusListAction {
    static async execute(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const [campuses, total] = await Promise.all([
            await prisma.campus.findMany({
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
        return { campuses, total }

    }
}

export default CampusListAction;
