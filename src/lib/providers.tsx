"use client";

import {
  px2remTransformer,
  StyleProvider as StyleProviderAntd,
} from "@ant-design/cssinjs";

const transformers = px2remTransformer({
  rootValue: 16,
});

export function StyleProvider({ children }: React.PropsWithChildren) {
  return (
    <StyleProviderAntd transformers={[transformers]}>
      {children}
    </StyleProviderAntd>
  );
}
