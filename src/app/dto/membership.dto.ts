import { GroupDTO } from "./group.dto";

export class MembershipDTO {
  group: GroupDTO;
  role: 'OWNER' | 'ADMIN' | 'MEMBER';
  since: string;
}
