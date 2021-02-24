export class UserDTO {
  name!: string;
  email!: string;
  role?: 'SUDO' | 'USER';
  gender?: 'MALE' | 'FEMALE' | 'NON BINARY' | 'UNKNOWN';
  mfaMethod?: 'NONE' | 'TOTP' | 'EMAIL' | 'SMS';
  contactNo?: string;
  country?: string;
  isActive?: boolean;
  isMFA?: boolean;
  isDetectLocationOnLogin?: boolean;
  isNotifications?: boolean;
  ispasswordLess?: boolean;
}

export class DisplayUserDTO {
  id!: number;
  name!: string;
  profilePictureUrl?: string;
  role?: 'SUDO' | 'USER';
  gender?: 'MALE' | 'FEMALE' | 'NON BINARY' | 'UNKNOWN';
  contactNo?: string;
  status?: 'Active' | 'Inactive';
  createdOn?: string;
  updatable: boolean; 
}

export class UpdateUserDTO {
  name?: string;
  role?: 'SUDO' | 'USER';
  gender?: 'MALE' | 'FEMALE' | 'NON BINARY' | 'UNKNOWN';
}
