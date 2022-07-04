SELECT "public"."PriceUpperFace"."id", "public"."PriceUpperFace"."name", "public"."PriceUpperFace"."gender", "public"."PriceUpperFace"."times", "public"."PriceUpperFace"."price", "public"."PriceUpperFace"."oncePrice", "public"."PriceUpperFace"."description", "public"."PriceUpperFace"."partsId", "public"."PriceUpperFace"."clinicId" 
FROM "public"."PriceUpperFace" 
WHERE ("public"."PriceUpperFace"."partsId" = $1 
AND ("public"."PriceUpperFace"."id") 
IN (SELECT "t0"."id" FROM "public"."PriceUpperFace" AS "t0" INNER JOIN "public"."Clinic" AS "j0" ON ("j0"."id") = ("t0"."clinicId") WHERE ("j0"."staffGender" = $2 AND "t0"."id" IS NOT NULL)))
ORDER BY "public"."PriceUpperFace"."price" ASC LIMIT $3 OFFSET $4