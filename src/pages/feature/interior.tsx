import { FeatureSearch } from "components/templete/feature/FeatureSearch.tsx";
import { Feature } from "enums/FeatureEnum";
import { NextPage } from "next";
import Head from "next/head";
import { memo, useCallback, useEffect, useState, VFC } from "react";

const numOfTake = 10;

const InteriorFeature: NextPage = () => {
  return (
    <>
      <Head>
        <title>内装の豪華なクリニック | あなたのための脱毛</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめする内装が豪華なクリニックです"
        />
      </Head>
      <FeatureSearch
        title="内装が豪華なクリニック"
        take={numOfTake}
        featureName={Feature.interior}
      />
    </>
  );
};
export default InteriorFeature;
