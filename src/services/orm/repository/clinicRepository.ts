import { prisma } from "services/prisma";

export class ClinicRepository {
  // constructor(private readonly prisma = prisma.clinic) {}

  async getAll() {
    return prisma.clinic.findMany();
  }

  async getAllClinicAndLimit(take: number, skip: number) {
    const query = prisma.clinic.findMany({
      include: {
        clinicOption: true,
        clinicOpeningHours: true,
      },
      take: take,
      skip: skip,
    });
    return query;
  }

  async getOneClinic(clinicId: string) {
    const query = await prisma.clinic.findFirst({
      where: {
        id: clinicId,
      },
      include: {
        clinicOption: true,
        clinicOpeningHours: true,
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
        clinicOption: {
          anesthesia: {
            contains: "無料",
          },
        },
      },
      include: {
        clinicOption: true,
        clinicOpeningHours: true,
      },
      take: take,
      skip: skip,
    });
    return query;
  }

  async getCountFreeAnesthesia() {
    const query = prisma.clinic.count({
      where: {
        clinicOption: {
          anesthesia: {
            contains: "無料",
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
            medhicalLoan: {
              contains: "OK",
            },
          },
        ],
      },
      include: {
        clinicOption: true,
        clinicOpeningHours: true,
      },
      take: take,
      skip: skip,
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
        clinicOption: true,
        clinicOpeningHours: true,
      },
      take: take,
      skip: skip,
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
        clinicOption: true,
        clinicOpeningHours: true,
      },
      take: take,
      skip: skip,
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
        clinicOption: {
          studentDiscount: {
            contains: "あり",
          },
        },
      },
      include: {
        clinicOption: true,
        clinicOpeningHours: true,
      },
      take: take,
      skip: skip,
    });
    return query;
  }

  async getCountSutudentDiscount() {
    const query = prisma.clinic.count({
      where: {
        clinicOption: {
          studentDiscount: {
            contains: "あり",
          },
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
        AND: [
          {
            clinicOption: {
              firstVisitFees: {
                contains: "無料",
              },
              subsequentVisitFees: {
                contains: "無料",
              },
            },
          },
        ],
      },
      include: {
        clinicOption: true,
        clinicOpeningHours: true,
      },
      take: take,
      skip: skip,
    });
    return query;
  }

  async getCountVisitFee() {
    const query = prisma.clinic.count({
      where: {
        OR: [
          {
            clinicOption: {
              firstVisitFees: {
                contains: "無料",
              },
              subsequentVisitFees: {
                contains: "無料",
              },
            },
          },
        ],
      },
      // include: {
      //   clinicOption: true,
      //   clinicOpeningHours: true,
      // },
    });
    return query;
  }

  async getAllClinicByAreaId(areaId: string, take: number, skip: number) {
    const query = prisma.clinic.findMany({
      where: {
        areaId: areaId,
      },
      include: {
        clinicOption: true,
        clinicOpeningHours: true,
      },
      take: take,
      skip: skip,
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
