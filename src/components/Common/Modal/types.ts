// import { ModalKey } from 'constants/modal';
import { ParticipantType } from 'constants/tournament';
import { UserPackage } from 'types/package';
import { Match } from 'types/tournament-fixtures';

import { BaseModalProps } from './BaseModal';

/** Internal modal props: component */
export interface CommonModalProps extends Partial<BaseModalProps> {
  onModalClose: () => void;
}

export interface HelloWorldProps extends CommonModalProps {
  name?: string;
}

export interface CropImageProps extends CommonModalProps {
  image: File;
  aspect: number;
  onSubmit: (file: File) => void;
}

export interface InviteIntoGroupProps extends CommonModalProps {
  groupId: number;
}

export interface AddParticipantsProps extends CommonModalProps {
  groupId: number;
  tournamentId: number;
}

export interface RegisterTournamentProps extends CommonModalProps {
  tournamentId: number;
  participantType: string;
  fetchMyApplication: () => void;
}

export interface SelectPaymentMethodProps extends CommonModalProps {
  userId: string;
  packageId: number;
}

export interface ShowOrderDetailsProps extends CommonModalProps {
  orderId: string;
  onNavigate?: () => void;
}

export interface AddMatchProps extends CommonModalProps {
  tournamentId: number;
  participantType: ParticipantType;
  match: Match;
  onUpdate: (data: any) => void;
}

export interface ShowPackageDetailsProps extends CommonModalProps {
  package: UserPackage;
  onNavigate: (serviceName: string) => void;
}

export type AddRefereeProps = CommonModalProps & {
  tournamentId: number;
  onSubmit: () => void;
};

/** External modal props: useModal */
// type FilteredModalProps<T extends CommonModalProps> = Omit<T, 'onModalClose'> & {
//   onModalClose?: () => void;
// };

// export type ModalPropsMap = {
//   [K in ModalKey]: FilteredModalProps<_ModalPropsMap[K]>;
// };

// type _ModalPropsMap = {
//   [ModalKey.HELLO_WORLD]: HelloWorldProps;
//   [ModalKey.CROP_IMAGE]: CropImageProps;
//   [ModalKey.SELECT_PAYMENT_METHOD]: SelectPaymentMethodProps;
//   [ModalKey.ADD_PARTICIPANTS]: AddParticipantsProps;
//   [ModalKey.REGISTER_TOURNAMENT]: RegisterTournamentProps;
// };
