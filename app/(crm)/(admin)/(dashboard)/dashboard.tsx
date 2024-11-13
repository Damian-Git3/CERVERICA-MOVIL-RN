import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import { ActivityIndicator, Dimensions, Text, View, TouchableOpacity } from 'react-native';
import useGraficas from "@/hooks/dashboard/useGraficas";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import { ReporteVentas } from '../../../../models/venta';
import useVentas from "@/hooks/useVentas";
import { router } from "expo-router";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#ffe0b2", // Color de fondo (naranja claro)
  backgroundGradientTo: "#ffcc80", // Degradado hacia un tono más oscuro
  color: (opacity = 1) => `rgba(255, 87, 34, ${opacity})`, // Color naranja vibrante para las líneas y barras
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color negro para las etiquetas
  strokeWidth: 2, // Grosor de las líneas
  barPercentage: 0.5, // Ancho de las barras
  decimalPlaces: 0, // Números enteros en el eje Y
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "#ff5722", // Borde de los puntos en gráficos de línea
  },
};

const Dashboard = () => {
  const {
    cargando,
    nuevosClientesMes,
    ventasStatus,
    pedidosMetodoPago,
    productosMasVendidos,
    getNuevosClientesMes,
    getVentasStatus,
    getPedidosMetodoPago,
    getProductosMasVendidos,
  } = useGraficas();

  const 
  { resumenVentas, getResumenVentas } = useVentas();

  const graphData = (labels, dataset) => {
    return {
      labels: labels,
      datasets: [
        {
          data: dataset,
        },
      ],
    };
  };

  const graphDataClientes = (
    clientes: { año: number; mes: number; nuevosClientes: number }[]
  ) => {
    console.log("Clientes grafica", clientes);

    // Agrupamos los clientes por año y mes
    const clientesPorAnioYMes = clientes.reduce((acc, cliente) => {
      const key = `${cliente.año}-${cliente.mes}`;
      if (acc[key]) {
        acc[key] += cliente.nuevosClientes;
      } else {
        acc[key] = cliente.nuevosClientes;
      }
      return acc;
    }, {});

    console.log("Clientes por año y mes", clientesPorAnioYMes);

    // Preparamos los datos para VictoryChart
    const labels = Object.keys(clientesPorAnioYMes).map((key) => {
      const [year, month] = key.split("-");
      return `${month}/${year}`;
    });
    const data = Object.values(clientesPorAnioYMes).map((value) =>
      Number(value)
    );

    return {
      labels: labels,
      datasets: [
        {
          data: data,
        },
      ]
    };
  };

  const screenWidth = Dimensions.get("window").width;

  const [clientesPorAnio, setClientesPorAnio] = useState({});

  useEffect(() => {
    try {
      getNuevosClientesMes!();
      getVentasStatus!();
      getPedidosMetodoPago!();
      getProductosMasVendidos!();
      getResumenVentas!();
      if (nuevosClientesMes) {
        console.log("Nuevos clientes por mes dashboard", nuevosClientesMes);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const onRefresh = async () => {
    try {
      await getNuevosClientesMes();
      await getVentasStatus();
      await getPedidosMetodoPago();
      await getProductosMasVendidos();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const navigateToReporte = (param: string) => {
    router.push(`/(crm)/(admin)/(ventas)/reporte-ventas?param=${param}`);
  };

  if (cargando) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      <ScrollView className="">
        <Text className="text-2xl font-bold mb-4">Dashboard</Text>
        <View className="flex-1 bg-white p-4 rounded-lg shadow-md mb-4">
          <Text className="text-lg font-bold mb-2">
            Nuevos Clientes por Mes
          </Text>
          {nuevosClientesMes?.length === 0 && (
            <Text className="text-center">No hay datos para mostrar</Text>
          )}
          {nuevosClientesMes && (
            <LineChart
              data={graphDataClientes(nuevosClientesMes)}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig} // Aplicando el nuevo chartConfig
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // Asegúrate de que los valores del eje Y incrementen de 1 en 1
            />
          )}
        </View>

        <View className="flex-1 bg-white p-4 rounded-lg shadow-md mb-4">
          <Text className="text-lg font-bold mb-2">Ventas por status</Text>
          {ventasStatus?.length === 0 ||
            (ventasStatus === undefined && (
              <Text className="text-center">No hay datos para mostrar</Text>
            ))}
          {ventasStatus != undefined && (
            <>
              <BarChart
                data={graphData(
                  ventasStatus.map((v) => v.estatus),
                  ventasStatus.map((v) => v.cantidad)
                )}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig} // Aplicando el nuevo chartConfig
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // Los valores del eje Y serán enteros
              />
            </>
          )}
        </View>

        <View className="bg-white p-4 rounded-lg shadow-md mb-4">
          <Text className="text-lg font-bold mb-2">
            Pedidos por Método de Pago
          </Text>
          {pedidosMetodoPago?.length === 0 && (
            <Text className="text-center">No hay datos para mostrar</Text>
          )}
          {pedidosMetodoPago && (
            <BarChart
              data={graphData(
                pedidosMetodoPago.map((v) => v.metodoPago),
                pedidosMetodoPago.map((v) => v.cantidad)
              )}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig} // Aplicando el nuevo chartConfig
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // Los valores del eje Y serán enteros
            />
          )}
        </View>

        <View className="bg-white p-4 rounded-lg shadow-md mb-4">
          <Text className="text-lg font-bold mb-2">Productos Más Vendidos</Text>
          {productosMasVendidos?.length === 0 && (
            <Text className="text-center">No hay datos para mostrar</Text>
          )}
          {productosMasVendidos && (
            <BarChart
              data={graphData(
                productosMasVendidos.map((v) => v.producto),
                productosMasVendidos.map((v) => v.cantidadVendida)
              )}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig} // Aplicando el nuevo chartConfig
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // Los valores del eje Y serán enteros
            />
          )}
        </View>
        <TouchableOpacity onPress={() => navigateToReporte("semana")}>
        <View className="bg-white p-4 rounded-lg shadow-md mb-4">
          <Text className="text-lg font-bold mb-2">Monto de pedidos realizados</Text>
          {resumenVentas === null && (
            <Text className="text-center">No hay datos para mostrar</Text>
          )}
          {resumenVentas && (
            <BarChart
              data={graphData(Object.keys(resumenVentas), [resumenVentas.semana, resumenVentas.mes, resumenVentas.anio])}              width={screenWidth}
              height={220}
              chartConfig={chartConfig} // Aplicando el nuevo chartConfig
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // Los valores del eje Y serán enteros
            />
          )}
        </View>
        </TouchableOpacity>
        <Button title="Refresh" onPress={onRefresh} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
