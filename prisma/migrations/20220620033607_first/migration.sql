-- CreateTable
CREATE TABLE "OriginCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imgUrlLady" TEXT NOT NULL,
    "imgUrlMen" TEXT NOT NULL,

    CONSTRAINT "OriginCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imgUrlLady" TEXT NOT NULL,
    "imgUrlMen" TEXT NOT NULL,
    "set" BOOLEAN NOT NULL,
    "tableName" TEXT NOT NULL,
    "originId" TEXT NOT NULL,

    CONSTRAINT "AboutCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaseParts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "gender" INTEGER NOT NULL DEFAULT 3,
    "aboutCategoryId" TEXT NOT NULL,

    CONSTRAINT "BaseParts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaseParts_Parts" (
    "basePartsId" TEXT NOT NULL,
    "partsId" TEXT NOT NULL,

    CONSTRAINT "BaseParts_Parts_pkey" PRIMARY KEY ("basePartsId","partsId")
);

-- CreateTable
CREATE TABLE "Parts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "places" INTEGER NOT NULL,

    CONSTRAINT "Parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MachineHr" (
    "id" TEXT NOT NULL,
    "hairType" TEXT NOT NULL,
    "pain" INTEGER NOT NULL,
    "shotDetail" TEXT NOT NULL,
    "shotType" TEXT NOT NULL,
    "skinColor" INTEGER NOT NULL,

    CONSTRAINT "MachineHr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MachineShr" (
    "id" TEXT NOT NULL,
    "hairType" TEXT NOT NULL,
    "pain" INTEGER NOT NULL,
    "shotDetail" TEXT NOT NULL,
    "shotType" TEXT NOT NULL,
    "skinColor" INTEGER NOT NULL,

    CONSTRAINT "MachineShr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Machine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'クリニック名',
    "machineHrId" TEXT,
    "machineShrId" TEXT,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clinic_Machine" (
    "clinicId" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,

    CONSTRAINT "Clinic_Machine_pkey" PRIMARY KEY ("clinicId","machineId")
);

-- CreateTable
CREATE TABLE "Clinic" (
    "id" TEXT NOT NULL,
    "interior" TEXT,
    "address" TEXT NOT NULL,
    "cardPay" TEXT,
    "medhicalLoan" TEXT,
    "name" TEXT NOT NULL,
    "nearestStation" TEXT NOT NULL,
    "reserve" TEXT,
    "review" INTEGER,
    "roomType" TEXT,
    "staffGender" INTEGER NOT NULL DEFAULT 0,
    "tax" TEXT,
    "tel" TEXT,
    "url" TEXT,
    "areaId" TEXT NOT NULL,
    "clinicGroupId" TEXT,

    CONSTRAINT "Clinic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinicArea" (
    "id" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "registrationNumber" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ClinicArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinicGroup" (
    "id" TEXT NOT NULL,
    "exampleClinic" TEXT NOT NULL,
    "groupName" TEXT NOT NULL,

    CONSTRAINT "ClinicGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinicOpeningHours" (
    "id" TEXT NOT NULL,
    "startHours" TEXT NOT NULL,
    "endHours" TEXT NOT NULL,
    "description" TEXT,
    "mon" BOOLEAN NOT NULL,
    "thu" BOOLEAN NOT NULL,
    "wed" BOOLEAN NOT NULL,
    "thir" BOOLEAN NOT NULL,
    "fri" BOOLEAN NOT NULL,
    "sat" BOOLEAN NOT NULL,
    "sun" BOOLEAN NOT NULL,
    "hol" BOOLEAN NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "ClinicOpeningHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinicOption" (
    "id" TEXT NOT NULL,
    "irradiationLeakage" TEXT,
    "aftercare" TEXT,
    "anesthesia" TEXT,
    "campaign" TEXT,
    "contractCancellation" TEXT,
    "firstVisitFees" TEXT,
    "subsequentVisitFees" TEXT,
    "shaving" TEXT,
    "studentDiscount" TEXT,
    "troubleTreatment" TEXT,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "ClinicOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceAllBody" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oncePrice" INTEGER NOT NULL,
    "description" TEXT,
    "partsId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "PriceAllBody_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceArm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oncePrice" INTEGER NOT NULL,
    "description" TEXT,
    "partsId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "PriceArm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceBackBody" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oncePrice" INTEGER NOT NULL,
    "description" TEXT,
    "partsId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "PriceBackBody_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceBodySet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oncePrice" INTEGER NOT NULL,
    "description" TEXT,
    "partsId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "PriceBodySet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceFaceSet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oncePrice" INTEGER NOT NULL,
    "description" TEXT,
    "partsId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "PriceFaceSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceFrontBody" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oncePrice" INTEGER NOT NULL,
    "description" TEXT,
    "partsId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "PriceFrontBody_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceLeg" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oncePrice" INTEGER NOT NULL,
    "description" TEXT,
    "partsId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "PriceLeg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceLimb" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oncePrice" INTEGER NOT NULL,
    "description" TEXT,
    "partsId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "PriceLimb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceLowerBody" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oncePrice" INTEGER NOT NULL,
    "description" TEXT,
    "partsId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "PriceLowerBody_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceLowerFace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oncePrice" INTEGER NOT NULL,
    "description" TEXT,
    "partsId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "PriceLowerFace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceRange" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oncePrice" INTEGER NOT NULL,
    "description" TEXT,
    "partsId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "PriceRange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceSelect" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oncePrice" INTEGER NOT NULL,
    "description" TEXT,
    "partsId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "PriceSelect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceTime" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oncePrice" INTEGER NOT NULL,
    "description" TEXT,
    "partsId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "PriceTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceUpperBody" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oncePrice" INTEGER NOT NULL,
    "description" TEXT,
    "partsId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "PriceUpperBody_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceUpperFace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oncePrice" INTEGER NOT NULL,
    "description" TEXT,
    "partsId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "PriceUpperFace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceVioSet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oncePrice" INTEGER NOT NULL,
    "description" TEXT,
    "partsId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "PriceVioSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceVio" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oncePrice" INTEGER NOT NULL,
    "description" TEXT,
    "partsId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,

    CONSTRAINT "PriceVio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClinicOption_clinicId_key" ON "ClinicOption"("clinicId");

-- AddForeignKey
ALTER TABLE "AboutCategory" ADD CONSTRAINT "AboutCategory_originId_fkey" FOREIGN KEY ("originId") REFERENCES "OriginCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaseParts" ADD CONSTRAINT "BaseParts_aboutCategoryId_fkey" FOREIGN KEY ("aboutCategoryId") REFERENCES "AboutCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaseParts_Parts" ADD CONSTRAINT "BaseParts_Parts_basePartsId_fkey" FOREIGN KEY ("basePartsId") REFERENCES "BaseParts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaseParts_Parts" ADD CONSTRAINT "BaseParts_Parts_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Machine" ADD CONSTRAINT "Machine_machineHrId_fkey" FOREIGN KEY ("machineHrId") REFERENCES "MachineHr"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Machine" ADD CONSTRAINT "Machine_machineShrId_fkey" FOREIGN KEY ("machineShrId") REFERENCES "MachineShr"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clinic_Machine" ADD CONSTRAINT "Clinic_Machine_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clinic_Machine" ADD CONSTRAINT "Clinic_Machine_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clinic" ADD CONSTRAINT "Clinic_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "ClinicArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clinic" ADD CONSTRAINT "Clinic_clinicGroupId_fkey" FOREIGN KEY ("clinicGroupId") REFERENCES "ClinicGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicOpeningHours" ADD CONSTRAINT "ClinicOpeningHours_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicOption" ADD CONSTRAINT "ClinicOption_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceAllBody" ADD CONSTRAINT "PriceAllBody_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceAllBody" ADD CONSTRAINT "PriceAllBody_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceArm" ADD CONSTRAINT "PriceArm_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceArm" ADD CONSTRAINT "PriceArm_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceBackBody" ADD CONSTRAINT "PriceBackBody_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceBackBody" ADD CONSTRAINT "PriceBackBody_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceBodySet" ADD CONSTRAINT "PriceBodySet_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceBodySet" ADD CONSTRAINT "PriceBodySet_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceFaceSet" ADD CONSTRAINT "PriceFaceSet_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceFaceSet" ADD CONSTRAINT "PriceFaceSet_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceFrontBody" ADD CONSTRAINT "PriceFrontBody_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceFrontBody" ADD CONSTRAINT "PriceFrontBody_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceLeg" ADD CONSTRAINT "PriceLeg_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceLeg" ADD CONSTRAINT "PriceLeg_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceLimb" ADD CONSTRAINT "PriceLimb_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceLimb" ADD CONSTRAINT "PriceLimb_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceLowerBody" ADD CONSTRAINT "PriceLowerBody_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceLowerBody" ADD CONSTRAINT "PriceLowerBody_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceLowerFace" ADD CONSTRAINT "PriceLowerFace_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceLowerFace" ADD CONSTRAINT "PriceLowerFace_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceRange" ADD CONSTRAINT "PriceRange_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceRange" ADD CONSTRAINT "PriceRange_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceSelect" ADD CONSTRAINT "PriceSelect_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceSelect" ADD CONSTRAINT "PriceSelect_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceTime" ADD CONSTRAINT "PriceTime_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceTime" ADD CONSTRAINT "PriceTime_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceUpperBody" ADD CONSTRAINT "PriceUpperBody_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceUpperBody" ADD CONSTRAINT "PriceUpperBody_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceUpperFace" ADD CONSTRAINT "PriceUpperFace_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceUpperFace" ADD CONSTRAINT "PriceUpperFace_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceVioSet" ADD CONSTRAINT "PriceVioSet_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceVioSet" ADD CONSTRAINT "PriceVioSet_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceVio" ADD CONSTRAINT "PriceVio_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceVio" ADD CONSTRAINT "PriceVio_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
