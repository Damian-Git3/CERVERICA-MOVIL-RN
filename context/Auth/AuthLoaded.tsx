import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthLoaded = ({ children }: any) => {
  const { obteniendoSession } = useContext(AuthContext);

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

export default AuthLoaded;
