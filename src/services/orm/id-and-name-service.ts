import { NextApiRequest, NextApiResponse } from "next";
import { IdAndNameDto } from "types/IdAndNameDto";
import { OriginCategoryRepository } from "./repository/originCategoryRepository";

export class IdAndNameService {
  constructor(
    private readonly originCategoryRepository: OriginCategoryRepository
  ) {}

  async getAllOriginCategory(): Promise<IdAndNameDto[]> {
    return this.originCategoryRepository.getAllIdAndName();
  }
}
