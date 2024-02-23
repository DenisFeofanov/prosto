import { Button, Result } from "antd";

function Success({ onClick }: { onClick: () => void }) {
  return (
    <Result
      status="success"
      title="Заказ успешно оформлен!"
      subTitle="С вами свяжутся в ближайшее время"
      extra={<Button onClick={onClick}>Продолжить покупки</Button>}
    />
  );
}

export default Success;
