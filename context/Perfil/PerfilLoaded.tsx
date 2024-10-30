import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import PerfilContext from "./PerfilContext";

const PerfilLoaded = ({ children }: any) => {
  const { obteniendoSession } = useContext(PerfilContext);

  useEffect(() => {
    const manageSplashScreen = async () => {
      if (obteniendoSession) {
        await SplashScreen.preventAutoHideAsync();
      } else {
        await SplashScreen.hideAsync();
      }
    };

    manageSplashScreen();
  }, [obteniendoSession]);

  if (obteniendoSession) {
    return null;
  }

  return children;
};

export default PerfilLoaded;
