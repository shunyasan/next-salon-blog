import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "320px", // iPhone,Android
  md: "768px", // iPad,タブレット
  lg: "960px", // ノートPC
  xl: "1200px", // デスクトップPC
  "2xl": "1536px",
};

const theme = extendTheme({
  breakpoints,
  styles: {
    global: {
      body: {
        backgroundColor: "originWhite",
        color: "originBlack",
      },
      th: {
        border: "1px",
        textAlign: "center !important",
        fontSize: "0.6rem",
        backgroundColor: "originLiteGray",
      },
      td: {
        border: "1px",
        textAlign: "center  !important",
        fontSize: "0.6rem",
      },
    },
  },
  fonts: {
    body: "Noto Serif JP, serif",
  },
  colors: {
    transparent: "transparent",
    originWhite: "#f7fafc",
    originBlack: "#111",
    originLiteBlack: "#252525",
    originGray: "#b7b7b7",
    originLiteGray: "#e1e1e1",
    originGold: "#a59968",
    originDarkGold: "#7d7140",
    SeeThroughGold: "#ebdfc2",
    SeeThroughBlue: "#d9eeff",
  },
  components: {
    Button: {
      baseStyle: {
        color: "originWhite",
        backgroundColor: "originBlack",
        border: "2px",
        borderRadius: "1px",
        borderColor: "originBlack",
        _hover: {
          backgroundColor: "originGray",
        },
        _focus: {
          boxShadow: "none",
          backgroundColor: "none",
          outline: "none",
        },
      },
      sizes: {
        lg: {
          fontSize: "lg",
        },
      },
      variants: {
        base: {},
        secBase: {
          color: "originBlack",
          backgroundColor: "originWhite",
          border: "2px",
          borderColor: "originBlack",
        },
        gold: {
          backgroundColor: "originGold",
          borderColor: "originGold",
          border: "2px",
        },
        parts: {
          color: "originBlack",
          backgroundColor: "originWhite",
          borderBottom: "2px",
          borderColor: "originBlack",
        },
        whiteNotSpace: {
          color: "originBlack",
          backgroundColor: "originWhite",
          h: "100%",
          border: "2px",
        },
      },
    },
    CheckBox: {
      baseStyle: {
        _focus: {
          boxShadow: "none",
          outline: "none",
        },
      },
    },
  },
});

export default theme;
