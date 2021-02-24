
export class MemberDTO {
  id: number;
  userId: number;
  name: string;
  profilePictureUrl: string;
  gender: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER';
  since: string;
  badgeEnabled: boolean;
  updatable: boolean;
}
