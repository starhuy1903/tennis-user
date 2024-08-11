import { useAppDispatch, useAppSelector } from 'store';

import { ModalKey } from 'constants/modal';
import { showModal } from 'store/slice/modalSlice';

import AddExpense from './AddExpense';
import AddParticipants from './AddParticipants';
import CreatePost from './CreatePost';
import CropImage from './CropImage';
import EditMatch from './EditMatch';
import AddRefereesGroupTournament from './GroupTournament/AddRefereeGroupTournament';
import InviteIntoGroup from './InviteIntoGroup';
import RegisterTournament from './RegisterTournament';
import SelectPaymentMethod from './SelectPaymentMethod';
import ShowOrderDetail from './ShowOrderDetails';
import ShowPackageDetails from './ShowPackageDetails';
import ShowUserProfile from './ShowUserProfile';
import AddReferee from './Tournament/AddReferee';
import SelectSeed from './Tournament/SelectSeed';
import UpdatePost from './UpdatePost';

const ModalsMap: { [modalKey: string]: any } = {
  [ModalKey.INVITE_INTO_GROUP]: InviteIntoGroup,
  [ModalKey.CROP_IMAGE]: CropImage,
  [ModalKey.SELECT_PAYMENT_METHOD]: SelectPaymentMethod,
  [ModalKey.REGISTER_TOURNAMENT]: RegisterTournament,
  [ModalKey.ADD_PARTICIPANTS]: AddParticipants,
  [ModalKey.SHOW_ORDER_DETAIL]: ShowOrderDetail,
  [ModalKey.EDIT_MATCH]: EditMatch,
  [ModalKey.SHOW_PACKAGE_DETAIL]: ShowPackageDetails,
  [ModalKey.ADD_REFEREE]: AddReferee,
  [ModalKey.ADD_REFEREE_GROUP_TOURNAMENT]: AddRefereesGroupTournament,
  [ModalKey.SELECT_SEED]: SelectSeed,
  [ModalKey.CREATE_POST]: CreatePost,
  [ModalKey.UPDATE_POST]: UpdatePost,
  [ModalKey.ADD_EXPENSE]: AddExpense,
  [ModalKey.SHOW_USER_PROFILE]: ShowUserProfile,
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
