// src/components/notifications/NotificationHeader.js
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const NotificationHeader = ({ filterQuery, onFilterChange, ascendente, onToggleOrder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        value={filterQuery}
        onChangeText={onFilterChange}
      />
      <TouchableOpacity onPress={onToggleOrder}>
        <Text style={styles.orderButton}>
          {ascendente ? 'Fecha Descendente' : 'Fecha Ascendente'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

NotificationHeader.propTypes = {
  filterQuery: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  ascendente: PropTypes.bool.isRequired,
  onToggleOrder: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  orderButton: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NotificationHeader;
