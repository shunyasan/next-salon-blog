import { NextApiRequest, NextApiResponse } from "next";
import { basePartsRepository } from "services/common/repository";
import { IdAndNameDto } from "types/IdAndNameDto";

export default async function getAllBasePartsIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>
) {
  const aboutCategoryId = req.query.aboutCategoryId as string;
  const data = await basePartsRepository.getAllBasePartsIdAndName(
    aboutCategoryId
  );

  // const data: IdAndNameDto[] = await getAxios(
  //   "base-parts/id-and-name/aboutCategoryId/" + aboutCategoryId
  // );
  res.json(data);
}
