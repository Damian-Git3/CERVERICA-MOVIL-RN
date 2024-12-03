export interface Usuario {
    FullName?: string;
    RefreshToken?: string;
    RefreshTokenExpiryTime?: Date;
    Activo: boolean;
    FechaRegistro?: Date;
    PhoneNumber?: string;
}