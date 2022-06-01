import { FC, ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

type Props = {
  readonly children: ReactNode;
};

export const Layout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
