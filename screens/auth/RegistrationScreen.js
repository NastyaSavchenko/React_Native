import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Background } from "../../components/Background";
import { MainBtn } from "../../components/MainBtn";

const initialState = {
  avatar: null,
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const [form, setForm] = useState(initialState);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [isShownPassword, setIsShownPassword] = useState(true);
  const [focusedInput, setFocusedInput] = useState(null);

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    console.log(form);
    setForm(initialState);
    navigation.navigate("Home");
  };

  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  return (
    <TouchableWithoutFeedback onPress={() => keyboardHide()}>
      <View style={styles.mainContainer}>
        <Background>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.select({
              ios: -170,
              android: -100,
            })}
          >
            <View style={styles.box}>
              <View style={styles.avatarBox}>
                <Image
                  source={require("../../assets/img/ava.webp")}
                  style={styles.avatar}
                />
                <TouchableOpacity style={styles.icon}>
                  <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <Text style={styles.mainText}>Реєстрація</Text>
                <View>
                  <TextInput
                    style={{
                      ...styles.input,
                      marginBottom: 16,
                      borderColor:
                        focusedInput === "login" ? "#FF6C00" : "#E8E8E8",
                    }}
                    value={form.login}
                    placeholder="Логін"
                    placeholderTextColor="#BDBDBD"
                    onFocus={() => {
                      setIsShownKeyboard(true);
                      handleInputFocus("login");
                    }}
                    onChangeText={(value) =>
                      setForm((prevState) => ({ ...prevState, login: value }))
                    }
                  />
                  <TextInput
                    style={{
                      ...styles.input,
                      marginBottom: 16,
                      borderColor:
                        focusedInput === "email" ? "#FF6C00" : "#E8E8E8",
                    }}
                    value={form.email}
                    placeholder="Адреса електронної пошти"
                    placeholderTextColor="#BDBDBD"
                    onFocus={() => {
                      setIsShownKeyboard(true);
                      handleInputFocus("email");
                    }}
                    onChangeText={(value) =>
                      setForm((prevState) => ({ ...prevState, email: value }))
                    }
                  />
                  <View
                    style={{
                      position: "relative",
                    }}
                  >
                    <TextInput
                      style={{
                        ...styles.input,
                        marginBottom: 43,
                        borderColor:
                          focusedInput === "password" ? "#FF6C00" : "#E8E8E8",
                      }}
                      value={form.password}
                      keyboardType="numeric"
                      placeholder="Пароль"
                      placeholderTextColor="#BDBDBD"
                      secureTextEntry={isShownPassword}
                      onFocus={() => {
                        setIsShownKeyboard(true);
                        handleInputFocus("password");
                      }}
                      onChangeText={(value) =>
                        setForm((prevState) => ({
                          ...prevState,
                          password: value,
                        }))
                      }
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{ position: "absolute", right: 16, top: 17 }}
                      onPress={() => setIsShownPassword(!isShownPassword)}
                    >
                      <Text style={styles.link}>Показати</Text>
                    </TouchableOpacity>
                  </View>
                  <MainBtn title={"Зареєструватись"} onSubmit={onSubmit} />
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ marginTop: 16 }}
                  onPress={() => {
                    keyboardHide();
                    navigation.navigate("Login");
                  }}
                >
                  <Text style={styles.link}>Вже є обліковий запис? Увійти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Background>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "#FFFFFF",
    borderRadius: "25px 25px 0px 0px",
    position: "relative",
  },
  container: {
    marginHorizontal: 16,
    paddingBottom: 78,
    paddingTop: 92,
  },
  mainText: {
    fontFamily: "RobotoMedium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
    color: "#212121",
    marginBottom: 33,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    fontFamily: "RobotoRegular",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
  },
  link: {
    fontFamily: "RobotoRegular",
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  avatarBox: {
    position: "absolute",
    width: 120,
    height: 120,
    top: -50,
    left: 150,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  icon: {
    position: "absolute",
    bottom: 16,
    right: -12,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
});
