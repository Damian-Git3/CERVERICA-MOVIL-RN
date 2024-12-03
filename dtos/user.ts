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
  idMayorista: string;
  rfcEmpresa: string;
  nombreEmpresa: string;
  direccionEmpresa: string;
  telefonoEmpresa: string;
  emailEmpresa: string;
  nombreContacto: string;
  cargoContacto: string;
  telefonoContacto: string;
  emailContacto: string;
  agenteVenta: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
  };
}
