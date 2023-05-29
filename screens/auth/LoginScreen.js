import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { authSignInUser } from "../../redux/auth/authOperations";
import { Background } from "../../components/Background";
import { MainBtn } from "../../components/MainBtn";

const initialState = {
  userEmail: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  const [form, setForm] = useState(initialState);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [isShownPassword, setIsShownPassword] = useState(true);
  const [focusedInput, setFocusedInput] = useState(null);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    dispatch(authSignInUser(form))
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
              ios: -240,
              android: -40,
            })}
          >
            <View style={styles.box}>
              <View style={styles.container}>
                <Text style={styles.mainText}>Увійти</Text>
                <View>
                  <TextInput
                    style={{
                      ...styles.input,
                      marginBottom: 16,
                      borderColor:
                        focusedInput === "email" ? "#FF6C00" : "#E8E8E8",
                    }}
                    value={form.userEmail}
                    placeholder="Адреса електронної пошти"
                    placeholderTextColor="#BDBDBD"
                    onFocus={() => {
                      setIsShownKeyboard(true);
                      handleInputFocus("email");
                    }}
                    onChangeText={(value) =>
                      setForm((prevState) => ({ ...prevState, userEmail: value }))
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
                  <MainBtn title={"Увійти"} onSubmit={onSubmit} />
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ marginTop: 16 }}
                  onPress={() => {
                    keyboardHide();
                    navigation.navigate("Registration");
                  }}
                >
                  <Text style={styles.link}>
                    Немає облікового запису? Зареєструватись
                  </Text>
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
    paddingBottom: 144,
    paddingTop: 32,
  },
  mainText: {
    fontFamily: "RobotoMedium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
    color: "#212121",
    marginBottom: 32,
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
});
