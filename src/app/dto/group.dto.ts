export class GroupDTO {
  id: number;
  name: string;
  updatable?: boolean = false;
  groupPictureUrl?: string;
  createdOn?: string;
  roles ?: string[];
  parentTeam ?: string; 
  isDefault ?: boolean;
}
