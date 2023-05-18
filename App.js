import { StyleSheet, Text, View } from "react-native";
import { LoginScreen } from "./screens/auth/LoginScreen";
import { RegistrationScreen } from "./screens/auth/RegistrationScreen";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  
  return (
  // < LoginScreen />  
  < RegistrationScreen />
  );
}
