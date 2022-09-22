import { defaultData } from "services/common/defaultData";
import { aboutCategoryRepository } from "services/common/repository";
import { orderPlanIdNameService } from "services/orderPlanIdNameService";
import { getOriginCategoryNameById } from "services/repository/originCategoryRepository";
import { OrderPlanIdName } from "types/OrderPlanIdName";
import { OrderPlanQuery } from "types/OrderPlanQuery";
import { BasicCategoryRepository } from "./basicCategoryRepository";
import { MachineRepository } from "./machineRepository";

const { defaultOption, defaultOrderPlanIdName } = defaultData();
const { getBasicCategoryName } = BasicCategoryRepository();
const { getMachineInIds } = MachineRepository();
const {
  checkNoneString,
  checkGenderString,
  checkAreaString,
  checkSortString,
  chackOptionValue,
  checkNumber,
} = orderPlanIdNameService();

export const orderPlanIdNameRepository = () => {
  const changeQueryToOrderPlanIdName = async (orderParams: OrderPlanQuery) => {
    const originCategory = await getOriginCategoryNameById(
      orderParams.originParts
    );
    const aboutCategory =
      await aboutCategoryRepository.getAboutCategoryNameById(
        orderParams.aboutCategory
      );
    const basicCategory = await getBasicCategoryName(orderParams.parts);

    const machines = await getMachineInIds(orderParams.machineIds);

    const times = {
      min: checkNumber(orderParams.times[0], defaultOrderPlanIdName.times.min),
      max: checkNumber(orderParams.times[1], defaultOrderPlanIdName.times.max),
    };

    const prices = {
      min: checkNumber(
        orderParams.prices[0],
        defaultOrderPlanIdName.prices.min
      ),
      max: checkNumber(
        orderParams.prices[1],
        defaultOrderPlanIdName.prices.max
      ),
    };

    const data: OrderPlanIdName = {
      gender: {
        id: orderParams.gender,
        name: checkGenderString(orderParams.gender),
      },
      area: {
        id: orderParams.area,
        name: checkAreaString(orderParams.area),
      },
      originParts: {
        id: orderParams.originParts,
        name: originCategory || "",
      },
      aboutCategory: {
        id: orderParams.aboutCategory,
        name: aboutCategory || "",
      },
      parts: { id: orderParams.parts, name: basicCategory || "" },
      // skinCollor: {
      //   id: orderParams.skinCollor,
      //   name: checkNoneString(orderParams.skinCollor),
      // },
      // hair: {
      //   id: orderParams.hair,
      //   name: checkNoneString(orderParams.hair),
      // },
      roomType: {
        id: orderParams.roomType,
        name: checkNoneString(orderParams.roomType),
      },
      interior: {
        id: orderParams.interior,
        name: checkNoneString(orderParams.interior),
      },
      staff: {
        id: orderParams.staff,
        name: checkNoneString(orderParams.staff),
      },
      card: {
        id: orderParams.card,
        name: checkNoneString(orderParams.card),
      },
      loan: {
        id: orderParams.loan,
        name: checkNoneString(orderParams.loan),
      },
      contract: {
        id: orderParams.contract,
        name: checkNoneString(orderParams.contract),
      },
      option: {
        id: orderParams.option,
        name: checkNoneString(orderParams.option),
      },
      sort: {
        id: orderParams.sort,
        name: checkSortString(orderParams.sort),
      },
      leakage: chackOptionValue(orderParams.leakage),
      aftercare: chackOptionValue(orderParams.aftercare),
      anesthesia: chackOptionValue(orderParams.anesthesia),
      firstVisitFees: chackOptionValue(orderParams.firstVisitFees),
      revisitFees: chackOptionValue(orderParams.revisitFees),
      shaving: chackOptionValue(orderParams.shaving),
      skinTrouble: chackOptionValue(orderParams.skinTrouble),
      machineIds: machines,
      times: times,
      prices: prices,
    };
    return data;
  };

  return {
    changeQueryToOrderPlanIdName,
  };
};
