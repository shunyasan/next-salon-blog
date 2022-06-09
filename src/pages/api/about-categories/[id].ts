import { AboutCategory } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { AboutCategoryService } from "services/orm/about-categories/get";

export default async function getAboutCategoryById(
  req: NextApiRequest,
  res: NextApiResponse<AboutCategory>
): Promise<AboutCategory> {
  const id = req.query.id as string;
  const aboutService = new AboutCategoryService();
  const data = await aboutService.getAboutCategoryById(id);
  // const data: AboutCategory = await getAxios("about-category/" + id);
  res.json(data);
  return data;
}
