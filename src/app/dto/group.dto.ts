export class GroupDTO {
  id: number;
  name: string;
  updatable?: boolean = false;
  groupPictureUrl?: string;
  createdOn?: string;
  displayTime ?: string;
  roles ?: string[];
  parentTeam ?: string; 
  isDefault ?: boolean;
}
