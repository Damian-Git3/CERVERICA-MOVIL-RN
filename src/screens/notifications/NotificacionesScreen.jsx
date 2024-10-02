// src/screens/notifications/NotificacionesScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native';
import NotificationItem from '../../components/notifications/NotificationItem';
import NotificationHeader from '../../components/notifications/NotificationHeader';
import { fetchNotificaciones, marcarNotificacionVisto } from '../../services/notificationService';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificaciones, eliminarNotificacion } from '../../store/notifications/notificationActions';
import { formatFecha } from '../../utils/dateFormatter'

const NotificacionesScreen = () => {
  const dispatch = useDispatch();
  const { notificaciones, loading, error } = useSelector(state => state.notifications);

  const [filterQuery, setFilterQuery] = useState('');
  const [ascendente, setAscendente] = useState(true);
  const [filteredNotificaciones, setFilteredNotificaciones] = useState([]);

  useEffect(() => {
    dispatch(getNotificaciones());
  }, [dispatch]);

  useEffect(() => {
    handleFilterAndSort();
  }, [notificaciones, filterQuery, ascendente]);

  const handleFilterAndSort = () => {
    let data = [...notificaciones];

    // Filtrar
    if (filterQuery) {
      data = data.filter(noti =>
        noti.mensaje.toLowerCase().includes(filterQuery.toLowerCase()) ||
        formatFecha(noti.fecha).toLowerCase().includes(filterQuery.toLowerCase())
      );
    }

    // Ordenar
    data.sort((a, b) => {
      const dateA = new Date(a.fecha);
      const dateB = new Date(b.fecha);
      return ascendente ? dateA - dateB : dateB - dateA;
    });

    setFilteredNotificaciones(data);
  };

  const handleToggleOrder = () => {
    setAscendente(!ascendente);
  };

  const handleVistoPress = async (notificacion) => {
    try {
      await marcarNotificacionVisto(notificacion.id);
      dispatch(eliminarNotificacion(notificacion.id));
      ToastAndroid.show('Notificación marcada como vista', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Error al marcar la notificación', ToastAndroid.SHORT);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NotificationHeader
        filterQuery={filterQuery}
        onFilterChange={setFilterQuery}
        ascendente={ascendente}
        onToggleOrder={handleToggleOrder}
      />
      <FlatList
        data={filteredNotificaciones}
        renderItem={({ item }) => (
          <NotificationItem notificacion={item} onVistoPress={handleVistoPress} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fondo negro según tu XML
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingBottom: 52, // Similar al paddingBottom en tu ScrollView
  },
});

export default NotificacionesScreen;
