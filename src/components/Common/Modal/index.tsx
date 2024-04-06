import { useAppDispatch, useAppSelector } from 'store';

import { ModalKey } from 'constants/modal';
import { showModal } from 'store/slice/modalSlice';

import CropImage from './CropImage';
import HelloWorld from './HelloWorld';
import InviteIntoGroup from './InviteIntoGroup';
import RegisterTournament from './RegisterTournament';
import SelectPaymentMethod from './SelectPaymentMethod';

const ModalsMap: { [modalKey: string]: any } = {
  [ModalKey.HELLO_WORLD]: HelloWorld,
  [ModalKey.INVITE_INTO_GROUP]: InviteIntoGroup,
  [ModalKey.CROP_IMAGE]: CropImage,
  [ModalKey.SELECT_PAYMENT_METHOD]: SelectPaymentMethod,
  [ModalKey.REGISTER_TOURNAMENT]: RegisterTournament,
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
