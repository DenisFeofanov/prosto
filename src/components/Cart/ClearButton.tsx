import { Button } from "antd";

interface Props {
  onClick: () => void;
  className: string;
}

export default function ClearButton({ onClick, className }: Props) {
  return (
    <Button className={className} danger onClick={onClick} size="middle">
      Очистить корзину
    </Button>
  );
}
