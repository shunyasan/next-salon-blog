import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";
import { FC, memo, useCallback, VFC } from "react";

type Props = {
  text: string;
  path: string;
  size?: string;
  base?: string;
};

export const BaseButton: FC<Props> = (props) => {
  const { text, path, size, base } = props;
  const router = useRouter();

  const onClickHistory = useCallback(() => {
    router.push(path);
  }, [router, path]);

  return (
    <Button
      variant={base || "base"}
      size={size && `${size}`}
      onClick={onClickHistory}
    >
      {text}
    </Button>
  );
};
