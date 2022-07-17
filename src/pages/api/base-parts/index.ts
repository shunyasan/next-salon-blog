import { NextApiRequest, NextApiResponse } from "next";
import { IdAndNameRepository } from "services/repository/IdAndNameRepository";
import { IdAndNameDto } from "types/IdAndNameDto";

const { getBySortSelected } = IdAndNameRepository();

export default async function getBaseParts(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>

  // aboutCategoryId: string,
  // partsId?: string
) {
  const aboutCategoryId = req.query.aboutCategoryId as string;
  const partsId = req.query.partsId as string;
  const data = await getBySortSelected(aboutCategoryId, partsId);

  res.json(data);
}
