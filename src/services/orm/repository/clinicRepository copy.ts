import { prisma } from "services/prisma";

export const ClinicRepository = () => {
  // constructor(private readonly prisma = prisma.clinic)=> {}

  const getAll = async () => {
    return prisma.clinic.findMany();
  };

  const getAllClinicAndLimit = async (take: number, skip: number) => {
    const query = prisma.clinic.findMany({
      include: {
        clinicOption: true,
        clinicOpeningHours: true,
      },
      take: take,
      skip: skip,
    });
    return query;
  };

  const getOneClinic = async (clinicId: string) => {
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
  };

  const getFreeAnesthesia = async (
    take: number,
    skip: number,
    notJoin?: boolean
  ) => {
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
  };

  const getCountFreeAnesthesia = async () => {
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
  };

  const getInstallments = async (
    take: number,
    skip: number,
    notJoin?: boolean
  ) => {
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
  };

  const getCountInstallments = async () => {
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
  };

  const getInterior = async (take: number, skip: number, notJoin?: boolean) => {
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
  };

  const getCountInterior = async () => {
    const query = prisma.clinic.count({
      where: {
        interior: {
          contains: "豪華",
        },
      },
    });
    return query;
  };

  const getPrivateRoom = async (
    take: number,
    skip: number,
    notJoin?: boolean
  ) => {
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
  };

  const getCountPrivateRoom = async () => {
    const query = prisma.clinic.count({
      where: {
        roomType: {
          contains: "完全個室",
        },
      },
    });
    return query;
  };

  const getSutudentDiscount = async (
    take: number,
    skip: number,
    notJoin?: boolean
  ) => {
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
  };

  const getCountSutudentDiscount = async () => {
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
  };

  const getVisitFee = async (take: number, skip: number, notJoin?: boolean) => {
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
  };

  const getCountVisitFee = async () => {
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
  };

  const getAllClinicByAreaId = async (
    areaId: string,
    take: number,
    skip: number
  ) => {
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
  };

  return {
    getAll,
    getAllClinicAndLimit,
    getOneClinic,
    getFreeAnesthesia,
    getCountFreeAnesthesia,
    getInstallments,
    getCountInstallments,
    getInterior,
    getCountInterior,
    getPrivateRoom,
    getCountPrivateRoom,
    getSutudentDiscount,
    getCountSutudentDiscount,
    getVisitFee,
    getCountVisitFee,
    getAllClinicByAreaId,
  };
  // selectQueryFeature(): SelectQueryBuilder<Clinic> {
  //   return prisma.clinic.findMany({include:{
  //     clinicOption:true,
  //     clinicOpeningHours:true;
  //   }}) ('clinic')
  //     .innerJoinAndSelect('clinic.clinicOption', 'clinicOption')
  //     .innerJoinAndSelect('clinic.clinicOpeningHours', 'clinicOpeningHours');
  // }
};
