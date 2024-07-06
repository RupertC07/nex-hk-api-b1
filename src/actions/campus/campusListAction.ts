import prisma from "../../utils/client";

class CampusListAction {
    static async execute() {
        return await prisma.campus.findMany({
            where: {
                deleted_at: null,
            },
        });
    }
}

export default CampusListAction;
