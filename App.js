import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { useRoute } from "./router";
import { store } from "./redux/store";


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
  
  return <Provider store={store}>
    <NavigationContainer>{routing}</NavigationContainer>
  </Provider> ;
}
