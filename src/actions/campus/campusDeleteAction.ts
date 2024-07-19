import prisma from "../../utils/client";

class CampusDeleteAction {
    static async execute(id: number) {
        return await prisma.campus.update({
            where: {
                id
            },
            data: {
                deleted_at: new Date()
            },
        });
    }
}

export default CampusDeleteAction;
