import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

interface CustomFormProps {
  onSubmit: (formData: { [key: string]: string }) => void;
  fields: {
    name: string;
    placeholder: string;
    type: "text" | "number" | "date" | "file";
    secureTextEntry?: boolean;
  }[];
}

const CustomForm: React.FC<CustomFormProps> = ({ onSubmit, fields }) => {
  const [formData, setFormData] = React.useState<{ [key: string]: string }>({});

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <View style={styles.container}>
      {fields.map((field) => (
        <View key={field.name} style={styles.inputContainer}>
          <Text style={styles.label}>{field.placeholder}</Text>
          <TextInput
            style={styles.input}
            placeholder={field.placeholder}
            secureTextEntry={field.secureTextEntry}
            onChangeText={(value) => handleChange(field.name, value)}
          />
        </View>
      ))}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
});

export default CustomForm;
