import { ComponentType } from "react";
import { TouchableOpacityProps } from "react-native-gesture-handler";

export type ButtonProps = TouchableOpacityProps & {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: ComponentType<any>;
  IconRight?: ComponentType<any>;
  className?: string;
};
