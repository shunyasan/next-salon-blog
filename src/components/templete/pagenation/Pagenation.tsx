import { FC, memo, ReactNode, useEffect, useState, VFC } from "react";
import { Box, Text } from "@chakra-ui/react";
import { PagenationBlock } from "./PagenationBlock";

// 親要素に持たせるもの
// <state>
// const [pagenationData, setPagenationData] = useState<{
//   now: number;
//   block: number;
// }>({
//   now: 0,
//   block: 0,
// });
///////
// <関数>
// const getPageNumber = useCallback(
//   async (page: number, block?: number) => {
//     getClinicDataAndAreaId(page, areaIdState.id);
//     if (block || block === 0) {
//       setPagenationData({ now: page, block: block });
//     } else {
//       setPagenationData({ ...pagenationData, now: page });
//     }
//   },
//   [getClinicDataAndAreaId, areaIdState, pagenationData]
// );
//////
// 要素
//  <Pagenation
// max={areaIdState.max}
// take={numOfTakeData}
// nowPage={pagenationData.now}
// pageBlock={pagenationData.block}
// onClickNumber={(page: number, block?: number) =>
//   getPageNumber(page, block)
// }
// >
// 以上

type Props = {
  children: ReactNode;
  max: number;
  take: number;
  nowPage: number; // 0が1ページ目
  pageBlock: number; // 0が1ブロック目
  onClickNumber: (page: number, block?: number) => void;
};

export const Pagenation: FC<Props> = (props) => {
  const { children, max, take, nowPage, pageBlock, onClickNumber } = props;
  const [takeDataNumber, setTakeDataNumber] = useState<number>(0);

  useEffect(() => {
    const page = take * (nowPage + 1);
    if (page > max) {
      setTakeDataNumber(max);
    } else {
      setTakeDataNumber(page);
    }
  }, [max, nowPage, take]);

  return (
    <Box>
      <Box>
        <Text my="1rem">
          〜{takeDataNumber}件/全{max}件
        </Text>
        <PagenationBlock
          max={max}
          take={take}
          nowPage={nowPage}
          pageBlock={pageBlock}
          onClickNumber={onClickNumber}
        />
        {children}
        <PagenationBlock
          max={max}
          take={take}
          nowPage={nowPage}
          pageBlock={pageBlock}
          onClickNumber={onClickNumber}
        />
      </Box>
      <Text my="1rem">
        〜{takeDataNumber}件/全{max}件
      </Text>
    </Box>
  );
};
