// src/actions/DutyListAction.ts
import { Prisma } from "@prisma/client";
import prisma from "../../utils/client";
import { DutyListParams } from "../../types/filterInterfaces";

class DutyListAction {
  static async execute({
    search = null,
    page = 1,
    perPage = 5,
  }: DutyListParams) {
    const where: Prisma.DutyWhereInput = {
      deleted_at: null,
      OR: search
        ? [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ]
        : undefined,
    };

    console.log(
      `Executing with search: ${search}, page: ${page}, perPage: ${perPage}`
    );

    const totalDuties = await prisma.duty.count({ where });

    const duties = await prisma.duty.findMany({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const totalPages = Math.ceil(totalDuties / perPage);

    return {
      duties,
      totalDuties: duties.length,
      totalPages,
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };
  }
}

export default DutyListAction;
