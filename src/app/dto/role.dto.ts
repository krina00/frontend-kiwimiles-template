export class RoleDTO {
  id: number;
  name: string;
  isUpdatable: boolean;
  isAllocated: boolean;
  isDefault?: boolean;
  createdAt?: string;
}
