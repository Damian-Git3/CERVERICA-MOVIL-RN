import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Button, Icon, Tooltip, Tag } from 'react-native-elements';
import ventaService from '../../services/ventaService';

const VentasTable = () => {
  const [cargando, setCargando] = useState(true);
  const [ventasFiltradas, setVentasFiltradas] = useState([]);

  useEffect(() => {
    obtenerVentas();
  }, []);

  const obtenerVentas = () => {
    // Lógica para obtener ventas
    ventaService.obtenerVentas();
    setCargando(false);
  };

  const filtrarVentas = (event) => {
    // Lógica para filtrar ventas
    const texto = event.target.value;
    const ventasFiltradas = ventas.filter((venta) => venta.producto.includes(texto));
  };

  const obtenerMetodoPago = (metodoPago) => {
    // Lógica para obtener método de pago
  };

  const obtenerMetodoEnvio = (metodoEnvio) => {
    // Lógica para obtener método de envío
  };

  const obtenerNombreEstatusVenta = (estatusVenta) => {
    // Lógica para obtener nombre de estatus de venta
  };

  const obtenerSeverityEstatusVenta = (estatusVenta) => {
    // Lógica para obtener severidad de estatus de venta
  };

  const retrocederPaso = (id) => {
    // Lógica para retroceder paso
  };

  const mostrarModal = (venta) => {
    // Lógica para mostrar modal
  };

  return (
    <View>
      {cargando && <Text>Cargando...</Text>}
      <View>
        <View>
          <Button
            icon={<Icon name="refresh" size={15} color="white" />}
            title="Actualizar"
            onPress={obtenerVentas}
          />
        </View>
        <View>
          <Icon name="search" size={15} />
          <TextInput
            placeholder="Buscar"
            onChangeText={filtrarVentas}
          />
        </View>
      </View>

      <FlatList
        data={ventasFiltradas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{new Date(item.fechaVenta).toLocaleString()}</Text>
            <Text>{item.totalCervezas}</Text>
            <Text>{obtenerMetodoPago(item.metodoPago)}</Text>
            <Text>{obtenerMetodoEnvio(item.metodoEnvio)}</Text>
            <Text>{item.montoVenta}</Text>
            <Tag value={obtenerNombreEstatusVenta(item.estatusVenta)} />
            <View>
              {item.estatusVenta !== 1 && (
                <Button
                  icon={<Icon name="backward" size={15} color="white" />}
                  title="Retroceder paso"
                  onPress={() => retrocederPaso(item.id)}
                />
              )}
              {item.estatusVenta === 1 && (
                <Button
                  icon={<Icon name="box" size={15} color="white" />}
                  title="Empezar empaquetar cervezas"
                  onPress={() => mostrarModal(item)}
                />
              )}
              {item.estatusVenta === 2 && (
                <Button
                  icon={<Icon name="box" size={15} color="white" />}
                  title="Empaquetar cervezas"
                  onPress={() => mostrarModal(item)}
                />
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default VentasTable;