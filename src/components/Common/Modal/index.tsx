import { useAppDispatch, useAppSelector } from 'store';
import { ModalKey } from 'constants/modal';
import { showModal } from 'store/slice/modalSlice';
import HelloWorld from './HelloWorld';

const ModalsMap: { [modalKey: string]: any } = {
  [ModalKey.HELLO_WORLD]: HelloWorld,
};

export function ModalContainer() {
  const dispatch = useAppDispatch();
  const { modalKey, onModalClose, ...rest } = useAppSelector(
    (state) => state.modal,
  );

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
