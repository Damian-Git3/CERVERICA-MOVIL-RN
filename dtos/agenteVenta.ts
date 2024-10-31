export interface AgenteVentaDTO {
  id: string;
  fullName: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  userName: string;
  normalizedUserName: string;
  normalizedEmail: string;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  lockoutEnabled: boolean;
  lockoutEnd: Date | null;
  accessFailedCount: number;
  twoFactorEnabled: boolean;
  activo: boolean;
  fechaRegistro: string;
  refreshToken: string | null;
  refreshTokenExpiryTime: Date | null;
  carrito: any | null; // Puedes ajustar el tipo si conoces la estructura
  clientesMayoristas: any | null;
  favoritosComprador: any | null;
  cupones: any | null;
  solicitudesCambioAgenteActual: any | null;
  solicitudesCambioAgenteNuevo: any | null;
  produccionesSolicitadas: any | null;
  produccionesAprobadas: any | null;
  pedidoMayoreo: any | null;
  estadisticaAgenteVenta: any | null;
  solicitudesAsistencia: any | null;
}
