export interface TransaccionPuntosDto {
  id: number;
  puntos: number;
  tipoTransaccion: string;
  fechaTransaccion: Date; // Asegúrate de que el formato sea compatible en el backend
  descripcion: string;
}
