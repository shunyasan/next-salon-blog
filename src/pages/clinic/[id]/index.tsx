import { Box, Checkbox, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import {
  AboutCategory,
  Clinic,
  ClinicOpeningHours,
  ClinicOption,
} from "@prisma/client";
import ClinicTemplate from "components/templete/pages/clinic/ClinicTemplate";
import { ClinicSummaryCard } from "components/organisms/board/ClinicSummaryCard";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ClinicService } from "services/orm/clinics/get";

type Props = {
  clinicData: Clinic & {
    clinicOption: ClinicOption | null;
    clinicOpeningHours: ClinicOpeningHours[];
  };
};

const clinicService = new ClinicService();

export const getStaticPaths: GetStaticPaths = async () => {
  const datas: Clinic[] = await clinicService.getAllClinics();
  const paths = datas.map((data) => `/clinic/${data.id}`);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const param = params && params.id;
  const id = param && typeof param === "string" ? param : "";
  const clinicData = await clinicService.getOneClinic(id);

  // const clinicData: Clinic = await fetcher(`${thisURL}api/clinics/${id}`);
  return {
    props: {
      // fallback: {
      //   "/api/clinics/": getData,
      // },
      clinicData: clinicData,
    },
  };
};

const ClinicDetail: NextPage<Props> = ({ clinicData }) => {
  // const [selectTab, setSelectTab] = useState<string>("クリニック概要");

  // const changeTab = (tab: string) => {
  //   setSelectTab(tab);
  // };

  return (
    <ClinicTemplate
      clinicName={clinicData.name}
      selectTab={"クリニック概要"}
      clinicId={clinicData.id}
    >
      <ClinicSummaryCard clinicData={clinicData} />
      {/* オプションサービス
              {selectTab === "オプションサービス" && (
                <Box m={"2em"} w={"100%"}>
                  <ClinicOptionCard clinicData={clinicData} />
                </Box>
              )} */}
    </ClinicTemplate>
  );
};
export default ClinicDetail;
