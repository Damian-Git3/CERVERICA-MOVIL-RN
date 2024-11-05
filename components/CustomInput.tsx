import { Control, useController, FieldValues } from "react-hook-form";
import { StyleSheet, TextInput, TextInputProps, Text } from "react-native";

type InputProps = TextInputProps & {
  name: string;
  control: Control<any>;
  required?: boolean;
};

const CustomInput = ({
  name,
  control,
  required = false,
  ...props
}: InputProps) => {
  const { field, fieldState } = useController({
    control,
    defaultValue: "",
    name,
    rules: { required: required ? "Este campo es obligatorio" : false },
  });

  return (
    <>
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        style={styles.input}
        {...props}
        placeholderTextColor="#a9a9a9"
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
