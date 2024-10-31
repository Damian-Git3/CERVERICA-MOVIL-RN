import botella1 from "@/assets/images/botella_peyote_mx.png";
import botella2 from "@/assets/images/botella_razz_mx.png";
import botella3 from "@/assets/images/botella_surfa_mx.png";

import topVector from "@/assets/images/topVector.png";
import leftVectorLogin from "@/assets/images/left_vector_login.png";
import leftVectorSignUp from "@/assets/images/left_vector_sign_up.png";

import iconoNavbar from "@/assets/images/icono_navbar.png";
import iconoCompleto from "@/assets/images/icono_completo.png";
import noResult from "@/assets/images/no-result.png";

import arrowDown from "@/assets/icons/arrow-down.png";
import arrowUp from "@/assets/icons/arrow-up.png";
import backArrow from "@/assets/icons/back-arrow.png";
import chat from "@/assets/icons/chat.png";
import checkmark from "@/assets/icons/check.png";
import close from "@/assets/icons/close.png";
import dollar from "@/assets/icons/dollar.png";
import email from "@/assets/icons/email.png";
import eyecross from "@/assets/icons/eyecross.png";
import google from "@/assets/icons/google.png";
import home from "@/assets/icons/home.png";
import list from "@/assets/icons/list.png";
import lock from "@/assets/icons/lock.png";
import map from "@/assets/icons/map.png";
import marker from "@/assets/icons/marker.png";
import out from "@/assets/icons/out.png";
import person from "@/assets/icons/person.png";
import pin from "@/assets/icons/pin.png";
import point from "@/assets/icons/point.png";
import profile from "@/assets/icons/profile.png";
import search from "@/assets/icons/search.png";
import selectedMarker from "@/assets/icons/selected-marker.png";
import star from "@/assets/icons/star.png";
import target from "@/assets/icons/target.png";
import to from "@/assets/icons/to.png";
import { Platform } from "react-native";

export const images = {
  botella1,
  botella2,
  botella3,
  iconoCompleto,
  iconoNavbar,
  topVector,
  leftVectorLogin,
  leftVectorSignUp,
  noResult,
};

export const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

export const slidersBienvenida = [
  {
    id: 1,
    titulo: "¡La mejor cerveza a solo un clic!",
    descripcion:
      "Descubre cervezas artesanales y premium con un solo toque. ¡Tu experiencia cervecera comienza aquí!",
    imagen: images.botella1,
  },
  {
    id: 2,
    titulo: "Explora sabores únicos y sorprendentes",
    descripcion:
      "Desde cervezas refrescantes hasta las más intensas, encuentra tu sabor ideal con nuestra app.",
    imagen: images.botella2,
  },
  {
    id: 3,
    titulo: "Cerveza para cada ocasión",
    descripcion:
      "Ya sea una reunión o una celebración, tenemos la cerveza perfecta para acompañarte. ¡Salud!",
    imagen: images.botella3,
  },
];

export const icons = {
  arrowDown,
  arrowUp,
  backArrow,
  chat,
  checkmark,
  close,
  dollar,
  email,
  eyecross,
  google,
  home,
  list,
  lock,
  map,
  marker,
  out,
  person,
  pin,
  point,
  profile,
  search,
  selectedMarker,
  star,
  target,
  to,
};

export const listHeaders = {
  ventas: ["Fecha de venta", "Total de cervezas", "Metodo de envio", "Metodo de pago", "Estatus", "Total de venta"],
}
