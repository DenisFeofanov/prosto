import TextArea from "antd/es/input/TextArea";
import { ChangeEvent } from "react";

interface Props {
  note: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function NoteInput({ note, onChange }: Props) {
  return (
    <TextArea
      value={note}
      onChange={onChange}
      placeholder="Открытка к букету"
      autoSize={{ minRows: 2, maxRows: 10 }}
      allowClear
    />
  );
}
