// src/utils/dateFormatter.js
export const formatFecha = (fecha) => {
    const now = new Date();
    const date = new Date(fecha);
    const diffInMillis = now - date;
    const minutes = Math.floor(diffInMillis / (1000 * 60));
    const hours = Math.floor(diffInMillis / (1000 * 60 * 60));
    const days = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));
  
    if (minutes < 60) return `Hace ${minutes} minutos`;
    if (hours < 24) return `Hace ${hours} horas`;
    if (days === 1) return `Ayer a las ${date.getHours()}:${date.getMinutes()} a. m.`;
    if (days < 7) return `${date.toLocaleDateString('es-ES', { weekday: 'long' })} a las ${date.getHours()}:${date.getMinutes()} a. m.`;
    if (days < 365) return `${date.getDate()} de ${date.toLocaleDateString('es-ES', { month: 'long' })} a las ${date.getHours()}:${date.getMinutes()} a. m.`;
    return `${date.getDate()} de ${date.getMonth() + 1} de ${date.getFullYear()}`;
  };
  