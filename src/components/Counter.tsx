import { InputNumber } from "antd";
import { useState } from "react";

interface Props {
  amount: number;
}

export default function Counter({ amount }: Props) {
  const [value, setValue] = useState<number | null>(1);

  return (
    <div>
      <InputNumber
        min={1}
        max={amount}
        keyboard={true}
        defaultValue={1}
        value={value}
        onChange={setValue}
        size="large"
      />
    </div>
  );
}
