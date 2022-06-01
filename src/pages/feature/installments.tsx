import { FeatureSearch } from "components/templete/feature/FeatureSearch.tsx";
import { Feature } from "enums/FeatureEnum";
import { NextPage } from "next";
import Head from "next/head";
import { memo, useCallback, useEffect, useState, VFC } from "react";

const numOfTake = 10;

const InstallmentsFeature: NextPage = () => {
  return (
    <>
      <Head>
        <title>分割払い可能なクリニック | あなたのための脱毛</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめする分割払い可能なクリニックです。カード、ローンが利用できます。"
        />
      </Head>
      <FeatureSearch
        title="分割払い可能なクリニック"
        take={numOfTake}
        featureName={Feature.installments}
      />
    </>
  );
};

export default InstallmentsFeature;
