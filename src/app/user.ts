export class User{
  name: string;
  email: string; 
  password?: string;
  passwordResetToken?: string;
  code?: number
  access?: string;
  isActive?: boolean;
}
