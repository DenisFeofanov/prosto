"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["cyrillic"],
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
