import prisma from "../../utils/client";

class CampusDeleteAction {
    static async execute(id: number) {
        const campus = await prisma.campus.findUnique({
            where: { id },
        });

        if (!campus || campus.deleted_at) {
            return null;
        }

        return await prisma.campus.update({
            where: { id },
            data: { deleted_at: new Date() },
        });
    }
}

export default CampusDeleteAction;
