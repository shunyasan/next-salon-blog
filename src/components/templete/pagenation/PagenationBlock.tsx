import { FC, memo, useEffect, useState, VFC } from "react";
import { Box, HStack } from "@chakra-ui/react";

type Props = {
  max: number;
  take: number;
  nowPage: number; // 0が1ページ目
  pageBlock: number;
  onClickNumber: (page: number, block?: number) => void;
};

export const PagenationBlock: FC<Props> = (props) => {
  const { max, take, nowPage, pageBlock, onClickNumber } = props;

  const [arrayNum, setArrayNum] = useState<number>(5);
  const [endsStatus, setEndsStatus] = useState<{
    front: boolean;
    end: boolean;
  }>({ front: false, end: false });

  useEffect(() => {
    const maxPage = Math.ceil(max / take);
    // end
    const changeBlockNum = pageBlock + 1;
    const border = maxPage / (changeBlockNum * 5);
    // 両方
    const state = { front: pageBlock > 0, end: border > 1 };
    setEndsStatus(state);

    //番号の配列
    const array = (pageBlock + 1) * 5 < maxPage ? 5 : maxPage - pageBlock * 5;
    setArrayNum(array);
  }, [pageBlock, max, take]);

  // const numberOfViewPage = useCallback(() => {
  //   const page = take * (nowPage + 1);
  //   if (page > max) {
  //     setTakeDataNumber(max);
  //   } else {
  //     setTakeDataNumber(page);
  //   }
  // }, [max, nowPage, take]);

  //   const getArrayNumber = useCallback(() => {
  //     const base = (pageBlock + 1) * 5;
  //     if(base < numOfMaxPage){
  //       return 5;
  //     }else{
  //       const num = numOfMaxPage - pageBlock * 5
  //       return num;
  //     }
  // }, [max, nowPage, take]);

  return (
    <HStack justifyContent={"center"}>
      {/* 一番前のページ */}
      {endsStatus.front && (
        <Box
          cursor={"pointer"}
          border={"1px"}
          borderColor={"OriginBlack"}
          w={"1.5rem"}
          onClick={() => onClickNumber(pageBlock * 5 - 1, pageBlock - 1)}
        >
          ＜
        </Box>
      )}
      {/* ページの一覧 */}
      {[...Array(arrayNum)].map((_, i) => (
        <Box
          key={i}
          cursor={"pointer"}
          border={"1px"}
          borderColor={"OriginBlack"}
          w={"1.5rem"}
          bg={nowPage === pageBlock * 5 + i ? "originBlack" : ""}
          color={nowPage === pageBlock * 5 + i ? "originWhite" : ""}
          onClick={() => onClickNumber(pageBlock * 5 + i)}
        >
          {pageBlock * 5 + 1 + i}
        </Box>
      ))}
      {/* 一番後ろのページ */}
      {endsStatus.end && (
        <Box
          cursor={"pointer"}
          border={"1px"}
          borderColor={"OriginBlack"}
          w={"1.5rem"}
          onClick={() => onClickNumber((pageBlock + 1) * 5, pageBlock + 1)}
        >
          ＞
        </Box>
      )}
    </HStack>
  );
};
