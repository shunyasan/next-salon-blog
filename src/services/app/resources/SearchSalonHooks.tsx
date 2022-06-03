import { useCallback } from "react";
import { TopResource } from "../../../../resorces/TopResource";

export const getRandomImg = () => {
  const img = [
    TopResource.clinicImg1,
    TopResource.clinicImg2,
    TopResource.clinicImg3,
    TopResource.clinicImg4,
    TopResource.clinicImg5,
    TopResource.clinicImg6,
    TopResource.clinicImg7,
    TopResource.clinicImg8,
    TopResource.clinicImg9,
    TopResource.clinicImg10,
  ];
  const randomNum = Math.floor(Math.random() * 9);
  return img[randomNum];
};
