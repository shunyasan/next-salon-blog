import { NextApiRequest, NextApiResponse } from "next";
import { AboutCategory } from "types/api/AboutCategory";
import { getAxios } from "../../../services/orm/get";

export default async function getAboutCategoryById(
  req: NextApiRequest,
  res: NextApiResponse<AboutCategory>
): Promise<AboutCategory> {
  const id = req.query.id;
  const data: AboutCategory = await getAxios("about-category/" + id);
  res.json(data);
  return data;
}
