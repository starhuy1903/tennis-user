import { useAppDispatch, useAppSelector } from 'store';

import { ModalKey } from 'constants/modal';
import { showModal } from 'store/slice/modalSlice';

import HelloWorld from './HelloWorld';
import InviteIntoGroup from './InviteIntoGroup';
import SelectPaymentMethod from './SelectPaymentMethod';

const ModalsMap: { [modalKey: string]: any } = {
  [ModalKey.HELLO_WORLD]: HelloWorld,
  [ModalKey.INVITE_INTO_GROUP]: InviteIntoGroup,
  [ModalKey.SELECT_PAYMENT_METHOD]: SelectPaymentMethod,
};

export function ModalContainer() {
  const dispatch = useAppDispatch();
  const { modalKey, onModalClose, ...rest } = useAppSelector((state) => state.modal);

  if (!modalKey) {
    return null;
  }

  const modalProps = {
    onModalClose: () => {
      dispatch(showModal(null));
      onModalClose?.();
    },
    ...rest,
  };

  const DisplayedModal = ModalsMap[modalKey];
  return <DisplayedModal {...modalProps} />;
}
