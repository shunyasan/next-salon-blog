import { FeatureSearch } from "components/templete/feature/FeatureSearch.tsx";
import { Feature } from "enums/FeatureEnum";
import { NextPage } from "next";
import Head from "next/head";
import { memo, useCallback, useEffect, useState, VFC } from "react";

const numOfTake = 10;

const PrivateRoomFeature: NextPage = () => {
  return (
    <>
      <Head>
        <title>完全個室のあるクリニック | あなたのための脱毛</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめする完全個室のあるクリニックです。VIOなどで気にされる方におすすめです。"
        />
      </Head>
      <FeatureSearch
        title="完全個室のクリニック"
        take={numOfTake}
        featureName={Feature.privateRoom}
      />
    </>
  );
};

export default PrivateRoomFeature;
