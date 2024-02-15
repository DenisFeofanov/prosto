export interface ModalOptions {
  maskClosable?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  afterClose?: () => void;
  onOk?: () => void;
}
