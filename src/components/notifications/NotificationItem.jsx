// src/components/notifications/NotificationItem.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { formatFecha } from '../../utils/dateFormatter';
import PropTypes from "prop-types";
import { NotificationPropTypeShape } from '../../models/NotificationModel';

const NotificationItem = ({ notificacion, onVistoPress }) => {
  const getIconoTipo = (tipo) => {
    switch (tipo) {
      case 1:
        return require('../../assets/images/cuenta.png');
      case 2:
        return require('../../assets/images/favorito.png');
      // Añade más casos según tus tipos
      default:
        return require('../../assets/images/beer.png');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={getIconoTipo(notificacion.tipo)} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.mensaje}>{notificacion.mensaje}</Text>
        <Text style={styles.fecha}>{formatFecha(notificacion.fecha)}</Text>
      </View>
      <TouchableOpacity onPress={() => onVistoPress(notificacion)}>
        <Image
          source={require('../../assets/images/fire.png')}
          style={styles.botonVisto}
        />
      </TouchableOpacity>
    </View>
  );
};

NotificationItem.propTypes = {
  notificacion: PropTypes.shape(NotificationPropTypeShape).isRequired,
  onVistoPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  mensaje: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  fecha: {
    fontSize: 12,
    color: '#666',
  },
  botonVisto: {
    width: 40,
    height: 40,
    tintColor: '#FFA500', // Color naranja
  },
});

export default NotificationItem;
