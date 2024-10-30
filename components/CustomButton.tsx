import { ButtonProps } from "@/types/ButtonProps";
import { TouchableOpacity, Text } from "react-native";

const getBgVariantStyle = (
  variant: ButtonProps["bgVariant"],
  disabled: boolean
) => {
  if (disabled) {
    return "bg-gray-300"; // Fondo para botón deshabilitado
  }

  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#ed9224]";
  }
};

const getTextVariantStyle = (
  variant: ButtonProps["textVariant"],
  disabled: boolean
) => {
  if (disabled) {
    return "text-gray-400"; // Color de texto para botón deshabilitado
  }

  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  disabled = false, // Asume disabled como falso por defecto
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress} // Evita onPress si está deshabilitado
      className={`w-full rounded-full p-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 
      ${getBgVariantStyle(bgVariant, disabled)} 
      ${className} ${disabled ? "opacity-50" : ""}`} // Agrega opacidad si está deshabilitado
      disabled={disabled}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={`text-lg font-bold ${getTextVariantStyle(
          textVariant,
          disabled
        )}`}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
