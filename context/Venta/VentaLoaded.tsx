import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import VentaContext from "./VentaContext";

const VentaLoaded = ({ children }: any) => {
  const { obteniendoVentas } = useContext(VentaContext);

  useEffect(() => {
    const manageSplashScreen = async () => {
      if (obteniendoVentas) {
        await SplashScreen.preventAutoHideAsync();
      } else {
        await SplashScreen.hideAsync();
      }
    };

    manageSplashScreen();
  }, [obteniendoVentas]);

  if (obteniendoVentas) {
    return null;
  }

  return children;
};

export default VentaLoaded;
