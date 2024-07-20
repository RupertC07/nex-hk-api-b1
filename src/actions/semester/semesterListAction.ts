// src/actions/DutyListAction.ts
import { Prisma, SemTerm } from "@prisma/client";
import prisma from "../../utils/client";
import { SearchListParams } from "../../types/filterInterfaces";

class SemesterListAction {
  static async execute({
    search = null,
    page = 1,
    perPage = 5,
  }: SearchListParams) {
    const where: Prisma.SemesterWhereInput = {
      deleted_at: null,
      OR: search
        ? [
          { sy: { contains: search, mode: "insensitive" } },
          { term: { equals: search as SemTerm } },
        ]
        : undefined,
    };

    // console.log(
    //   `Executing with search: ${search}, page: ${page}, perPage: ${perPage}`
    // );

    const totalSemester = await prisma.semester.count({ where });

    const semester = await prisma.semester.findMany({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const totalPages = Math.ceil(totalSemester / perPage);

    return {
      semester,
      totalSemester: semester.length,
      totalPages,
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };
  }
}

export default SemesterListAction;
