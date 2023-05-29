import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import { store } from "./redux/store";
import { Main } from "./components/Main";


export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Provider store={store}>
   <Main/>
  </Provider> ;
}
