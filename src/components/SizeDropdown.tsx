import { SIZES } from "@/shared/constants";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space } from "antd";

interface Props {
  onSelect: ({ selectedKeys }: { selectedKeys: string[] }) => void;
  selectedSize: string;
}

export default function SizeDropdown({ onSelect, selectedSize }: Props) {
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
    onSelect,
  };

  return (
    <Dropdown menu={menuProps}>
      <Button size="large">
        <Space>
          {`Размер ${selectedSize}`}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
}
