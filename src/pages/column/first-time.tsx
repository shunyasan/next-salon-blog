import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import { H1 } from "components/atoms/text/H1";
import { H2 } from "components/atoms/text/H2";
import { LinkSentence } from "components/atoms/text/LinkSentence";
import { Sentence } from "components/atoms/text/Sentence";
import { BulletPoint_1 } from "components/molecules/box/BulletPoint_1";
import { ContentsBox } from "components/molecules/box/ContentsBox";
import { ImageInColumn } from "components/molecules/box/ImageInColumn";
import { PriceImageListColumn } from "components/molecules/box/PriceImageListColumn";
import { QuotePhotoBox } from "components/molecules/box/QuotePhotoBox";
import { SearchResultCard } from "components/organisms/box/SearchResultCard";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { IoIosArrowUp } from "react-icons/io";
import { defaultData } from "services/common/defaultData";
import { priceForColumnRepository } from "services/repository/priceForColumnRepository";
import { OrderPlanIdName } from "types/OrderPlanIdName";
import { PriceForColumn } from "types/PriceForColumn";
import { ArticleResource } from "../../../resorces/ArticleResource";

type Props = {
  orderPlanIdName: OrderPlanIdName;
  prices: PriceForColumn[];
};

const { defaultOrderPlanIdName } = defaultData();
const { getRandomPriceColumnSelect } = priceForColumnRepository();

export const getStaticProps: GetStaticProps<Props> = async () => {
  const priceForColumn = await getRandomPriceColumnSelect();

  return {
    props: {
      orderPlanIdName: defaultOrderPlanIdName,
      prices: priceForColumn,
    },
  };
};

const FirstTime: NextPage<Props> = ({ orderPlanIdName, prices }) => {
  return (
    <Box id={"top"}>
      <Head>
        <title>
          【調査100院以上】おすすめの医療脱毛の探し方 | 脱毛コンサルタント
        </title>
        <meta
          name="description"
          content="初めて医療脱毛する方にとっては、何を基準に選べば良いのか不安を感じる方は少なくありません。どんな点に注意した選び方だと満足度の高い脱毛ができるのか紹介します"
        />
      </Head>
      <H1 title="【調査100院以上】おすすめの医療脱毛の探し方" />
      <Flex my="2rem">
        <Box w={{ md: "70%", sm: "100%" }}>
          <ImageInColumn src={ArticleResource.firstTime_Top} alt={"探し方"} />
          <ContentsBox
            width={"19rem"}
            my={{ md: "4rem", sm: "4rem" }}
            texts={[
              "探し方の前提は...",
              "【１番目】施術範囲",
              "【２番目】費用",
              "【３番目】予約の取りやすさ",
              "【４番目】肌トラブル時の対応",
              "まとめ",
            ]}
          />
          <Box mx={{ md: "4rem", sm: "2rem" }} pl={{ md: "3rem", sm: "0" }}>
            <Sentence>
              初めて医療脱毛する方にとっては、何を基準に選べば良いのかわからない人は多くいるかと思います。
            </Sentence>
            <Sentence>
              選べていたとしても、本当にこのクリニックで大丈夫なのか不安を感じる方も少なくありません。
            </Sentence>
            <Sentence>
              今回は、80院以上の脱毛プランを調査してきた中で、どんな点に注意して探すと満足度の高い脱毛ができるのかを紹介していきます。
            </Sentence>
            <H2 title="探し方の前提は..." />
            <Sentence>
              まず、前提で最もおすすめするのは「トラブルに遭わないこと」です。
            </Sentence>
            <Sentence>
              なぜなら、満足のいく脱毛は数を重ねていくうちに実現できますが、最初からトラブルに遭い辛い思いをしてしまうと、脱毛を続ける気力もお金も削がれてしまうからです。
            </Sentence>
            <Sentence>
              よって、継続して脱毛をするための前提として「トラブルに遭わないこと」を重視することをおすすめします。
            </Sentence>
            <Sentence>
              今回は、最低限これだけ確認が出来ていれば問題ないと思う点をピックアップしました。
            </Sentence>
            <Sentence>上から重要度の高い順番になっています。</Sentence>
            <BulletPoint_1
              texts={[
                "施術範囲",
                "費用",
                "予約が取りやすいか",
                "肌トラブル時の対応",
              ]}
            />
            <Sentence>詳しくお話ししていきます。</Sentence>
            <H2 title="【１番目】施術範囲" />
            <Sentence>費用よりも先に施術範囲の確認をおすすめします。</Sentence>
            <Sentence>あなたの脱毛したい部位があるとします。</Sentence>
            <Sentence>
              その部位を、全てのクリニックが同じ範囲で対応してくれると考えていませんか？
            </Sentence>
            <ImageInColumn
              src={ArticleResource.firstTimeRange}
              alt={"範囲(女)"}
            />
            <ImageInColumn
              src={ArticleResource.firstTimeRange2}
              alt={"範囲(男)"}
            />
            <Sentence>
              実は、多くの脱毛プランを比較してきた中で、プラン名は他クリニックと同じでも範囲が違うプランを多く見かけました。
            </Sentence>
            <Sentence>
              また、範囲が変わることで、安くなったり、高くなったりするプランもあります。
            </Sentence>
            <Sentence>
              例えばVIOの場合、足の付け根より少し下側まで対応してくれるクリニックもあれば、追加料金を支払う必要のあるクリニックもありました。
            </Sentence>
            <Sentence>
              あなたの考えている脱毛範囲をもう一度確認し、希望する範囲を含んでいるのかチェックしてみてください。
            </Sentence>
            <LinkSentence url="/">施術範囲から探す</LinkSentence>
            <H2 title="【２番目】費用" />
            <Sentence>次に、適した価格帯かを確認していきます。</Sentence>
            <Sentence>
              同じ部位でもクリニックによってかなりの価格幅があります。
            </Sentence>
            <Sentence>
              例えばVIO脱毛の場合だと、当サイトが調査した中では10000円~50000円前後での価格帯がありました。
            </Sentence>
            <ImageInColumn
              src={ArticleResource.firstTimePrice}
              alt={"価格帯"}
            />
            <Sentence>
              せっかくの稼いだお金を余分に払ってしまっては、勿体無いです。
            </Sentence>
            <Sentence>
              脱毛を検討しているクリニックのプランが、相場に適していた価格なのか、少し高い場合でも、価格に見合った内装やスタッフレベルなのか確認してみてください。
            </Sentence>
            <LinkSentence url="/">プランの費用を検索する</LinkSentence>
            <PriceImageListColumn prices={prices} />
            <H2 title="【３番目】予約の取りやすさ" />
            <Sentence>
              脱毛範囲と価格を決定したら、予約がある程度希望通りに取れるかを確認します。
            </Sentence>
            <Sentence>
              脱毛施術には大きく分けて２つのコースがあります。
            </Sentence>
            <BulletPoint_1
              texts={[
                "複数回分を支払う一括払い（以降、一括払い）",
                "１回分のみを支払う都度払い（以降、都度払い）",
              ]}
            />
            <ImageInColumn
              src={ArticleResource.firstTimeBook2}
              alt={"コース"}
            />
            <Sentence>
              一括払いを扱っているクリニックは、都度払いと比較して予約を取りやすいか調べる必要が高いです。
            </Sentence>
            <Sentence>
              利用者が一括払いで契約すると、複数回分の枠を確保するため、予約が埋まりやすい傾向があるためです。
            </Sentence>
            <Sentence>
              都度払いだけしか扱っていないクリニックは、一括払いの利用者を抱えていないため予約枠が埋まりにくい傾向があります。
            </Sentence>
            <Sentence>契約すると１枠のみを確保するためです。</Sentence>
            <ImageInColumn src={ArticleResource.firstTimeBook} alt={"コース"} />
            <Sentence>
              しかし、一括払いを扱うクリニックでも、都度払い同様の予約管理をしているところもあることに加え、あらかじめ来院する日がわかっている、価格が安いというメリットがあります。
            </Sentence>
            <Sentence>
              SNSとカウンセリングで、あなた以外の利用者の口コミ、予約管理の方法を確認してみてください。
            </Sentence>
            <LinkSentence url="/">予約状況を確認できる脱毛を探す</LinkSentence>
            <H2 title="【４番目】肌トラブル時の対応" />
            <Sentence>
              ここまで絞れればほぼ、問題ないと言いたいところですが、いざという時にとっても重要なことがあります。
            </Sentence>
            <Sentence>
              それは、肌トラブルが起きてしまった時のクリニック側の対応です。
            </Sentence>
            <Sentence>
              以下の症例は脱毛によって生じてしまった肌トラブルです。
            </Sentence>
            <QuotePhotoBox
              title={"施術後から、痒みが止まらず、赤く発疹が..."}
              quote={
                "引用:Yahoo!知恵袋 [https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q11116574026]"
              }
              height={{ md: "25vw", sm: "70vw" }}
              src={ArticleResource.firstTimeCase1}
            />
            <Sentence>
              あなたの選んだクリニックは、肌トラブル時に即日診療で対応するしてくれるでしょうか？
            </Sentence>
            <Sentence>
              万が一のために、クリニックに肌トラブルが生じてしまった時はどうすれば良いのか確認してください、必ずです。
            </Sentence>
            <Sentence>
              そこで安心できる回答がない場合は、クリニックを再検討した方が良いかもしれません。
            </Sentence>
            <Sentence>
              勇気を持って挑戦した脱毛を、トラブルの悪化で諦めてしまっては辛いことと思います。
            </Sentence>
            <Sentence>
              クリニックによりますが、トラブルが生じた際は無料で対応してくれたり、未然に防ぐためのアフターケアをしてくれるクリニックがあります。
            </Sentence>
            <LinkSentence url="/">
              肌トラブル時に無料で対応してくれるクリニック
            </LinkSentence>
            <H2 title="まとめ" />
            <Sentence>
              以上４点が問題なければ、大きなトラブルに発展することはないはずです。
            </Sentence>
            <Sentence>
              あなたの脱毛が満足できるものになることを心から願っています。
            </Sentence>
            <Sentence>
              脱毛コンサルタントでは80院以上から、あなたの好みの条件で検索ができます。
            </Sentence>
            <Sentence>
              今回記述した探し方に納得して頂けた方、ぜひこちらから４つの条件を選択して探してみてください。
            </Sentence>
          </Box>
          <PriceImageListColumn prices={prices} />
        </Box>
        <Flex
          w={"30%"}
          display={{ md: "block", sm: "none" }}
          px="1em"
          alignItems={"flex-end"}
        >
          <Box textAlign={"center"} pos={"sticky"} top={"0"}>
            <Text mb="1em">
              脱毛を検索する
              <Link
                ml="5px"
                fontSize={".8em"}
                href="/lady/plan"
                color={"originGold"}
              >
                こちら
              </Link>
            </Text>
            <SearchResultCard orderPlan={orderPlanIdName} />
          </Box>
        </Flex>
      </Flex>
      <Link href="#top">
        <Box
          bg={"originBlack"}
          color={"originWhite"}
          pos={"fixed"}
          bottom={{ md: "2em", sm: "1em" }}
          right={{ md: "3em", sm: "1em" }}
          p={{ md: "1em 2em", sm: ".9em 1em" }}
          borderRadius={"md"}
          textAlign={"center"}
          zIndex={1000}
        >
          <Icon fontSize={"1.3em"} as={IoIosArrowUp} />
          <Text mt="-5px" fontSize={".8em"}>
            TOP
          </Text>
        </Box>
      </Link>
    </Box>
  );
};

export default FirstTime;
