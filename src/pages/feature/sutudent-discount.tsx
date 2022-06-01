import { FeatureSearch } from "components/templete/feature/FeatureSearch.tsx";
import { Feature } from "enums/FeatureEnum";
import { NextPage } from "next";
import Head from "next/head";
import { memo, useCallback, useEffect, useState, VFC } from "react";

const numOfTake = 10;

const SutudentDiscountFeature: NextPage = () => {
  return (
    <>
      <Head>
        <title>学生料金のあるクリニック | あなたのための脱毛</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめする学生料金のあるクリニックです。学割などをご希望の方にておすすめです。"
        />
      </Head>
      <FeatureSearch
        title="学生料金（学割）のあるクリニック"
        take={numOfTake}
        featureName={Feature.sutudentDiscount}
      />
    </>
  );
};
export default SutudentDiscountFeature;
