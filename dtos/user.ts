export interface UserDetailDto {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  accessFailedCount: number;
  activo: boolean;
}
export interface UserMayoristaDetailDto {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  accessFailedCount: number;
  activo: boolean;
}
