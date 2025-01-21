import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";

import * as SplasshScreen from "expo-splash-screen";

import RegistrationScreen from "./screens/RegistrationScreen";

SplasshScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplasshScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />; // Показуй індикатор завантаження
  }

  return <RegistrationScreen />;
}
