import { FeatureSearch } from "components/templete/feature/FeatureSearch.tsx";
import { Feature } from "enums/FeatureEnum";
import { NextPage } from "next";
import Head from "next/head";
import { memo, useCallback, useEffect, useState, VFC } from "react";

const numOfTake = 10;

const VisitFeeFeature: NextPage = () => {
  return (
    <>
      <Head>
        <title>初診料が無料のクリニック | あなたのための脱毛</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめする初診料が無料のクリニックです。少しでも安いプランをご希望の方にておすすめです。"
        />
      </Head>
      <FeatureSearch
        title="初診・再診料無料のクリニック"
        take={numOfTake}
        featureName={Feature.visitFee}
      />
    </>
  );
};
export default VisitFeeFeature;
