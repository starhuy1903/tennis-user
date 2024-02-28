import { ModalKey } from "constants/modal";
import { BaseModalProps } from "./BaseModal";

/** Internal modal props: component */
export interface CommonModalProps extends Partial<BaseModalProps> {
  onModalClose: () => void;
}

export interface HelloWorldProps extends CommonModalProps {
  name?: string;
}

/** External modal props: useModal */
type FilteredModalProps<T extends CommonModalProps> = Omit<T, 'onModalClose'> & {
  onModalClose?: () => void;
};

export type ModalPropsMap = {
  [K in ModalKey]: FilteredModalProps<_ModalPropsMap[K]>;
}

interface _ModalPropsMap {
  [ModalKey.HELLO_WORLD]: HelloWorldProps;
}
