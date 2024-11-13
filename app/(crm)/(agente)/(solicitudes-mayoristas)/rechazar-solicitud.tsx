import CustomButton from "@/components/CustomButton";
import useSolicitudesMayoristas from "@/hooks/useSolicitudesMayoristas";
import { SolicitudMayorista } from "@/models/SolicitudesMayoristas";
import React, { useState } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "@/components/CustomInput";
import { router } from "expo-router";

type Inputs = {
  mensajeRechazo: string;
};

const RechazarSolicitud = ({
  solicitudMayorista,
}: {
  solicitudMayorista: SolicitudMayorista | null;
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { cancelarSolicitudMayorista } = useSolicitudesMayoristas();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { mensajeRechazo: "" },
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCancelar: SubmitHandler<Inputs> = async (data) => {
    try {
      await cancelarSolicitudMayorista({
        idSolicitud: solicitudMayorista!.id,
        mensajeRechazo: data.mensajeRechazo.trim(),
      });

      router.replace("/(agente)/(solicitudes-mayoristas)/lista-solicitudes");

      toggleModal();

      alert("Solicitud cancelada exitosamente.");
    } catch (error) {
      alert("Ocurrió un error al cancelar la solicitud.");
    }
  };

  return (
    <>
      <CustomButton
        title="Cancelar Solicitud"
        onPress={toggleModal}
        bgVariant="danger"
        className="mb-20 mt-20"
        IconRight={() => <Ionicons name="close" size={28} color="white" />}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Motivo de Rechazo</Text>
            <CustomInput
              name="mensajeRechazo"
              control={control}
              placeholder="Escribe el motivo del rechazo..."
              required={true}
              multiline={true}
            />
            <CustomButton
              title="Enviar"
              onPress={handleSubmit(handleCancelar)}
              bgVariant="success"
              className="mb-5"
            />
            <CustomButton
              title="Cancelar"
              onPress={toggleModal}
              bgVariant="secondary"
              className="mb-5"
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default RechazarSolicitud;
