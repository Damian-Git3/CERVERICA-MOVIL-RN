import React from "react";
import { Control, useController } from "react-hook-form";
import { StyleSheet, Text, TextInput, TextInputProps } from "react-native";

type InputProps = TextInputProps & {
  name: string;
  control: Control<any>;
  required?: boolean;
  numeric?: boolean; // Nueva propiedad para aceptar solo números
};

const CustomInput = ({
  name,
  control,
  required = false,
  numeric = false, // Valor por defecto es false
  ...props
}: InputProps) => {
  const { field, fieldState } = useController({
    control,
    defaultValue: "",
    name,
    rules: { required: required ? "Este campo es obligatorio" : false },
  });

  const handleChangeText = (text: string) => {
    if (numeric) {
      // Filtrar caracteres no numéricos
      const numericText = text.replace(/[^0-9]/g, "");
      field.onChange(numericText);
    } else {
      field.onChange(text);
    }
  };

  return (
    <>
      <TextInput
        value={field.value}
        onChangeText={handleChangeText}
        style={styles.input}
        {...props}
        placeholderTextColor="#a9a9a9"
        keyboardType={numeric ? "numeric" : "default"} // Establecer el tipo de teclado
      />
      {fieldState.error && (
        <Text style={styles.errorText}>{fieldState.error.message}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ED9224",
    padding: 10,
    marginBottom: 20,
    marginTop: 5,
    borderRadius: 5,
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

export default CustomInput;
