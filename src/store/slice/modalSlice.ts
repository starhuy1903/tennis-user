import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ModalPropsMap } from 'components/Common/Modal/types';
import { ModalKey } from 'constants/modal';

interface InitialState {
  modalKey: string | null;
  onModalClose: ((...args: any[]) => void) | null;
}

type ModalPayload = {
  modalKey: string | null;
  [key: string]: any;
};

type ModalProps<T extends ModalKey> = {
  onModalClose?: ((...args: any[]) => void) | null;
} & ModalPropsMap[T];

const initialState: InitialState = {
  modalKey: null,
  onModalClose: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: {
      prepare: <T extends ModalKey>(modalKey: T | null, modalProps?: ModalProps<T>) => ({
        payload: { modalKey, ...modalProps },
      }),
      reducer: (_, action: PayloadAction<ModalPayload>) => ({
        ...initialState,
        ...action.payload,
      }),
    },
    hideModal: (state, action: PayloadAction<any>) => {
      if (action.payload === state.displayModal) {
        state.displayModal = null;
      }
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
