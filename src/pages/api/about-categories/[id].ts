import { AboutCategory } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { aboutCategoryService } from "services/service";

export default async function getAboutCategoryById(
  req: NextApiRequest,
  res: NextApiResponse<AboutCategory>
): Promise<AboutCategory> {
  const id = req.query.id as string;
  const data = await aboutCategoryService.getAboutCategoryById(id);
  // const data: AboutCategory = await getAxios("about-category/" + id);
  res.json(data);
  return data;
}
