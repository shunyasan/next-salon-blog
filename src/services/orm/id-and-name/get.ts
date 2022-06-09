import { NextApiRequest, NextApiResponse } from "next";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
import { OriginCategoryRepository } from "../repository/originCategoryRepository";

export class IdAndNameService {
  constructor(
    private readonly originCategoryRepository = new OriginCategoryRepository()
  ) {}

  async getAllOriginCategory(): Promise<IdAndNameDto[]> {
    return this.originCategoryRepository.getAllIdAndName();
  }
}
