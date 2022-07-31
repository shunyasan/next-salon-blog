import { FC } from "react";
import { PriceDto } from "types/PriceDto";
import { OrderPlanIdName } from "types/OrderPlanIdName";
import { PriceDataBox } from "components/molecules/box/PriceDataBox";
import { PlanCard } from "./PlanCard";

type Props = {
  price: PriceDto;
  orderDataIdName: OrderPlanIdName;
};

export const PricePlanCard: FC<Props> = (props) => {
  const { price, orderDataIdName } = props;

  return (
    <PlanCard clinic={price.clinic} genderParam={orderDataIdName.gender.id}>
      <PriceDataBox price={price} orderDataIdName={orderDataIdName} />
    </PlanCard>
  );
};
