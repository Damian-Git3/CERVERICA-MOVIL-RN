import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import ventaService from '../../services/ventaService'; // Importar el servicio de ventas

const VentasModal = ({ reload }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(undefined);
  const [empaquetandoPedidos, setEmpaquetandoPedidos] = useState(false);
  const [habilitarMarcarListo, setHabilitarMarcarListo] = useState(false);
  const [cantidadTotalDetalles, setCantidadTotalDetalles] = useState(0);
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [productosEmpaquetados, setProductosEmpaquetados] = useState([]);

  const ocultar = () => {
    setMostrarModal(false);
    reload();
  };

  const mostrar = (venta) => {
    setMostrarModal(true);
    setVentaSeleccionada(venta);
    setHabilitarMarcarListo(false);
    setEmpaquetandoPedidos(false);
    setCantidadTotalDetalles(0);
    setProductosEmpaquetados([]);

    if (venta) {
      if (venta.estatusVenta === 2) {
        setEmpaquetandoPedidos(true);
      } else if (venta.estatusVenta === 1) {
        // Lógica adicional si es necesario
      }

      setProductosDisponibles(venta.productosPedido || []);
      setCantidadTotalDetalles(venta.productosPedido.length);
    }
  };

  const verificarProductosEmpaquetados = () => {
    // Lógica para verificar productos empaquetados
  };

  return (
    <Modal isVisible={mostrarModal}>
      <View style={{ flex: 1 }}>
        <Text>Detalles de la Venta</Text>
        {/* Aquí puedes añadir más contenido del modal */}
        <Button title="Cerrar" onPress={ocultar} />
      </View>
    </Modal>
  );
};

export default VentasModal;