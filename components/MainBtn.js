import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const MainBtn = ({ title, onSubmit }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={onSubmit}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "RobotoRegular",
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },
});
