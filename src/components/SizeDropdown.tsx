import { Size } from "@/interfaces/Bouquet";
import { isSize } from "@/lib/utils";
import { SIZES } from "@/shared/constants";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space } from "antd";

interface Props {
  onSelect: (size: Size) => void;
  selectedSize: string;
  disabled?: boolean;
}

export default function SizeDropdown({
  onSelect,
  selectedSize,
  disabled,
}: Props) {
  const handleSelect = ({ selectedKeys }: { selectedKeys: string[] }) => {
    if (!isSize(selectedKeys[0])) {
      return;
    }
    onSelect(selectedKeys[0]);
  };
  const items: MenuProps["items"] = SIZES.map(size => {
    return {
      label: size,
      key: size,
    };
  });

  const menuProps = {
    items,
    selectable: true,
    selectedKeys: [selectedSize],
    onSelect: handleSelect,
  };

  return (
    <Dropdown menu={menuProps} disabled={disabled}>
      <Button size="large">
        <Space>
          {`Размер ${selectedSize}`}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
}
