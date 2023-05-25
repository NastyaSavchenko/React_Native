import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { useRoute } from "./router";


export default function App() {
  
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  const routing = useRoute(null);
  
  return <NavigationContainer>{routing}</NavigationContainer>;
}
