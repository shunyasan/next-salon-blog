import { prisma } from "services/common/prisma";
import { RelationClinic } from "types/RelationClinic";

export class ClinicRepository {
  // constructor(private readonly prisma = prisma.clinic) {}

  async getAll() {
    return prisma.clinic.findMany();
  }

  async getOneClinic(clinicId: string) {
    const query = await prisma.clinic.findFirst({
      where: {
        id: clinicId,
      },
      include: {
        picture: {
          orderBy: {
            id: "asc",
          },
        },
        clinicOpeningHours: true,
        options: {
          distinct: ["kind"],
          where: {
            clinicId: clinicId,
          },
          orderBy: {
            price: "asc",
          },
        },
      },
    });
    if (!query) {
      throw Error();
    }
    return query;
  }

  async getFreeAnesthesia(take: number, skip: number, notJoin?: boolean) {
    const query = prisma.clinic.findMany({
      where: {
        options: {
          some: {
            kind: "anesthesia",
            price: 0,
          },
        },
      },
      include: {
        picture: {
          orderBy: {
            id: "asc",
          },
        },
        options: {
          distinct: ["kind"],
          orderBy: {
            price: "asc",
          },
        },
        clinicOpeningHours: true,
      },
      take: take,
      skip: skip,
      orderBy: {
        id: "asc",
      },
    });
    return query;
  }

  async getCountFreeAnesthesia() {
    const query = prisma.clinic.count({
      where: {
        options: {
          some: {
            kind: "anesthesia",
            price: 0,
          },
        },
      },
    });
    return query;
  }

  async getInstallments(take: number, skip: number, notJoin?: boolean) {
    const query = prisma.clinic.findMany({
      where: {
        OR: [
          {
            cardPay: {
              contains: "OK",
            },
          },
          {
            medhicalLoan: {
              contains: "OK",
            },
          },
        ],
      },
      include: {
        picture: {
          orderBy: {
            id: "asc",
          },
        },
        options: {
          distinct: ["kind"],
          orderBy: {
            price: "asc",
          },
        },
        clinicOpeningHours: true,
      },
      take: take,
      skip: skip,
      orderBy: {
        id: "desc",
      },
    });
    return query;
  }

  async getCountInstallments() {
    const query = prisma.clinic.count({
      where: {
        OR: [
          {
            cardPay: {
              contains: "OK",
            },
          },
          {
            medhicalLoan: {
              contains: "OK",
            },
          },
        ],
      },
    });
    return query;
  }

  async getInterior(take: number, skip: number, notJoin?: boolean) {
    const query = prisma.clinic.findMany({
      where: {
        interior: {
          contains: "豪華",
        },
      },
      include: {
        picture: {
          orderBy: {
            id: "asc",
          },
        },
        options: {
          distinct: ["kind"],
          orderBy: {
            price: "asc",
          },
        },
        clinicOpeningHours: true,
      },
      take: take,
      skip: skip,
      orderBy: {
        name: "desc",
      },
    });
    return query;
  }

  async getCountInterior() {
    const query = prisma.clinic.count({
      where: {
        interior: {
          contains: "豪華",
        },
      },
    });
    return query;
  }

  async getPrivateRoom(take: number, skip: number, notJoin?: boolean) {
    const query = prisma.clinic.findMany({
      where: {
        roomType: {
          contains: "完全個室",
        },
      },
      include: {
        picture: {
          orderBy: {
            id: "asc",
          },
        },
        options: {
          distinct: ["kind"],
          orderBy: {
            price: "asc",
          },
        },
        clinicOpeningHours: true,
      },
      take: take,
      skip: skip,
      orderBy: {
        url: "asc",
      },
    });
    return query;
  }

  async getCountPrivateRoom() {
    const query = prisma.clinic.count({
      where: {
        roomType: {
          contains: "完全個室",
        },
      },
    });
    return query;
  }

  async getSutudentDiscount(take: number, skip: number, notJoin?: boolean) {
    const query = prisma.clinic.findMany({
      where: {
        studentDiscount: {
          contains: "あり",
        },
      },
      include: {
        picture: {
          orderBy: {
            id: "asc",
          },
        },
        options: {
          distinct: ["kind"],
          orderBy: {
            price: "asc",
          },
        },
        clinicOpeningHours: true,
      },
      take: take,
      skip: skip,
      orderBy: {
        url: "desc",
      },
    });
    return query;
  }

  async getCountSutudentDiscount() {
    const query = prisma.clinic.count({
      where: {
        studentDiscount: {
          contains: "あり",
        },
      },
      // include: {
      //   clinicOption: true,
      //   clinicOpeningHours: true,
      // },
    });
    return query;
  }

  async getVisitFee(take: number, skip: number, notJoin?: boolean) {
    const query = prisma.clinic.findMany({
      where: {
        options: {
          some: {
            OR: [
              {
                kind: "firstVisitFees",
                price: 0,
              },
              {
                kind: "revisitFees",
                price: 0,
              },
            ],
          },
        },
      },
      include: {
        options: {
          distinct: ["kind"],
          orderBy: {
            price: "asc",
          },
        },
        picture: {
          orderBy: {
            id: "asc",
          },
        },
        clinicOpeningHours: true,
      },
      take: take,
      skip: skip,
      orderBy: {
        address: "asc",
      },
    });
    return query;
  }

  async getCountVisitFee() {
    const query = prisma.clinic.count({
      where: {
        options: {
          some: {
            OR: [
              {
                kind: "firstVisitFees",
                price: 0,
              },
              {
                kind: "revisitFees",
                price: 0,
              },
            ],
          },
        },
      },
    });
    return query;
  }

  // selectQueryFeature(): SelectQueryBuilder<Clinic> {
  //   return prisma.clinic.findMany({include:{
  //     clinicOption:true,
  //     clinicOpeningHours:true;
  //   }}) ('clinic')
  //     .innerJoinAndSelect('clinic.clinicOption', 'clinicOption')
  //     .innerJoinAndSelect('clinic.clinicOpeningHours', 'clinicOpeningHours');
  // }
}
