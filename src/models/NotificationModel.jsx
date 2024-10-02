// src/models/NotificacionModel.js
import PropTypes from "prop-types";

export class NotificacionModel {
  constructor(id, idUsuario, fecha, tipo, mensaje, visto) {
    this.id = id;
    this.idUsuario = idUsuario;
    this.fecha = fecha;
    this.tipo = tipo;
    this.mensaje = mensaje;
    this.visto = visto;
  }
}

export const NotificationPropTypeShape = {
  id: PropTypes.number.isRequired,
  idUsuario: PropTypes.string.isRequired,
  fecha: PropTypes.string.isRequired,
  tipo: PropTypes.number.isRequired,
  mensaje: PropTypes.string.isRequired,
  visto: PropTypes.bool.isRequired,
}
