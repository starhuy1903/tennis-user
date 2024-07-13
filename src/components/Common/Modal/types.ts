import { ParticipantType } from 'constants/tournament';
import { GroupPost } from 'types/group-post';
import { EditMatchPayload } from 'types/match';
import { OpenTournamentApplicant, Referee } from 'types/open-tournament-participants';
import { UserPackage } from 'types/package';
import { EditMatchTeam, Match } from 'types/tournament-fixtures';

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
  refetchParticipantsData: () => void;
}

export interface AddRefereesProps extends CommonModalProps {
  groupId: number;
  tournamentId: number;
  refetchRefereesData: () => void;
}

export interface RegisterTournamentProps extends CommonModalProps {
  tournamentId: number;
  participantType: string;
  onSuccess?: () => void;
}

export interface SelectPaymentMethodProps extends CommonModalProps {
  userId: string;
  packageId: number;
}

export interface ShowOrderDetailsProps extends CommonModalProps {
  orderId: string;
  onNavigate?: () => void;
}

export interface EditMatchProps extends CommonModalProps {
  tournamentId: number;
  referees: Referee[];
  teamData: EditMatchTeam[];
  participantType: ParticipantType;
  match: Match;
  onUpdate: (data: EditMatchPayload) => void;
  shouldUpdateToBE: boolean;
}

export interface ShowPackageDetailsProps extends CommonModalProps {
  package: UserPackage;
  onNavigate: (serviceName: string) => void;
}

export type AddRefereeProps = CommonModalProps & {
  tournamentId: number;
  onSubmit: () => void;
};

export type SelectSeedProps = CommonModalProps & {
  tournamentId: number;
  applicantData: OpenTournamentApplicant;
  onSubmit: () => void;
};

export interface CreatePostProps extends CommonModalProps {
  groupId: number;
  onSuccess?: () => void;
}

export interface UpdatePostProps extends CreatePostProps {
  post: GroupPost;
}

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
