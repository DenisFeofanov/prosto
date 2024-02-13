"use client";

import {
  px2remTransformer,
  StyleProvider as StyleProviderAntd,
} from "@ant-design/cssinjs";
import { Provider } from "react-redux";
import store from "./redux/store";

const transformers = px2remTransformer({
  rootValue: 16,
});

export function StyleProvider({ children }: React.PropsWithChildren) {
  return (
    <StyleProviderAntd transformers={[transformers]}>
      <Provider store={store}>{children}</Provider>
    </StyleProviderAntd>
  );
}
