import { Picture } from "@prisma/client";

export type PriceForColumn = {
  priceId: string;
  priceName: string;
  price: number;
  clinicId: string;
  clinic: string;
  picture: Picture;
};
