export interface RegistrarDTO {
    email: string;
    fullName: string;
    password: string;
    role: string;
}

export interface RegistrarMayoristaDTO {
    // Datos de usuario
    password: string;
    rol: string;  // Ejemplo: 'cliente'

    // Datos de la empresa
    nombreEmpresa: string;
    direccionEmpresa: string;
    telefonoEmpresa: string;
    emailEmpresa: string;

    // Datos de contacto

    nombreContacto: string;
    cargoContacto: string;
    telefonoContacto: string;
    emailContacto: string;
}
