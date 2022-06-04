import { NextApiRequest, NextApiResponse } from "next";
import { AboutCategory } from "types/api/AboutCategory";
import { getAxios } from "../../../../services/orm/get";

export default async function getAboutCategoryByOriginId(
  req: NextApiRequest,
  res: NextApiResponse<AboutCategory[]>
) {
  const originId = req.query.originId;
  const data: AboutCategory[] = await getAxios(
    "about-category/originId/" + originId
  );
  res.json(data);
  return data;
}
