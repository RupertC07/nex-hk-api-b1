import prisma from "../../utils/client";

class CampusShowAction {
    static async execute(id: number) {
        return await prisma.campus.findUnique({
            where: {
                id,
                deleted_at: null
            },
        });
    }
}

export default CampusShowAction;
