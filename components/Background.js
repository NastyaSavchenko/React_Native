import { ImageBackground, StyleSheet, Text, View } from "react-native";

export const Background = ({ children }) => (
  <ImageBackground
    source={require("../assets/img/BG.png")}
    style={styles.image}
  >
    {children}
  </ImageBackground>
);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
});
