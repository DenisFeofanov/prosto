import { CloseCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { MouseEvent } from "react";

interface Props {
  className: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}

function ClearItemButton({ className, onClick }: Props) {
  return (
    <Button
      className={`${className}`}
      type="text"
      danger
      icon={<CloseCircleOutlined />}
      onClick={onClick}
    />
  );
}

export default ClearItemButton;
