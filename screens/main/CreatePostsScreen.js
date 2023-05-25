import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { Camera } from "expo-camera";

import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export const CreatePostsScreen = ({ navigation }) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [titleText, setTitleText] = useState("");
  const [placeText, setPlaceText] = useState("");
  const [error, setError] = useState(null);
  const isDataComplete = photoUri && titleText && placeText;

  const hideKeyboard = () => {
    setIsKeyboardVisible(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(status === "granted");

      let location = await Location.requestForegroundPermissionsAsync();
      if (location.status !== "granted") {
        setError("Permission to access location was denied");
      }
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();

      setPhotoUri(photo.uri);
      const location = await Location.getCurrentPositionAsync();
      setLocationData(location);
    }
  };

  const onSubmit = () => {
    if (!isDataComplete) {
      Alert.alert("Будь ласка, завантажте фото та заповніть усі поля.");
      return;
    }

    const data = {
      photo: photoUri,
      title: titleText,
      place: placeText,
    };
    console.log(data);

    setPhotoUri("");
    setTitleText("");
    setPlaceText("");

    navigation.navigate("Публікації");
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : undefined}
        >
          <View style={styles.cameraContainer}>
            {photoUri && (
              <View style={styles.photoContainer}>
                <Image style={styles.photo} source={{ uri: photoUri }} />
              </View>
            )}
            <Camera style={styles.camera} ref={setCameraRef}>
              <TouchableOpacity
                style={styles.photoButtonContainer}
                activeOpacity={0.8}
                onPress={takePhoto}
              >
                <MaterialIcons
                  name="photo-camera"
                  size={24}
                  color={"#BDBDBD"}
                />
              </TouchableOpacity>
            </Camera>
          </View>
          {photoUri ? (
            <Text style={styles.text}>Редагувати фото</Text>
          ) : (
            <Text style={styles.text}>Завантажте фото</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Назва..."
            placeholderTextColor="#BDBDBD"
            onFocus={() => setIsKeyboardVisible(true)}
            value={titleText}
            onChangeText={(text) => setTitleText(text)}
          />
          <View style={styles.locationContainer}>
            <Ionicons
              name="location-outline"
              size={24}
              color="#BDBDBD"
              style={styles.locationIcon}
            />
            <TextInput
              style={{ ...styles.input, paddingLeft: 28 }}
              placeholder="Місцевість..."
              placeholderTextColor="#BDBDBD"
              onFocus={() => setIsKeyboardVisible(true)}
              value={placeText}
              onChangeText={(text) => setPlaceText(text)}
            />
          </View>
          <View>
            <TouchableOpacity
              style={[
                styles.createButton,
                isDataComplete ? styles.createButtonActive : null,
              ]}
              onPress={onSubmit}
            >
              <Text
                style={[
                  styles.createButtonText,
                  isDataComplete ? styles.createButtonTextActive : null,
                ]}
              >
                Опубліковати
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 32,
    paddingBottom: 34,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopWidth: 1,
    borderTopColor: "#BDBDBD",
  },
  cameraContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#000",
    overflow: "hidden",
  },
  camera: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  photoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
  },
  photoButtonContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  text: {
    fontFamily: "RobotoRegular",
    marginBottom: 32,
    marginTop: 8,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  snap: {
    color: "#fff",
  },
  locationContainer: {
    position: "relative",
  },
  locationIcon: {
    position: "absolute",
    ...Platform.select({
      ios: {
        top: -3,
      },
      android: {
        top: 3,
      },
    }),
  },
  input: {
    marginBottom: 32,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    fontFamily: "RobotoMedium",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
  },
  createButton: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
  },
  createButtonActive: {
    backgroundColor: "#FF6C00",
  },
  createButtonText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    color: "#BDBDBD",
    textAlign: "center",
  },
  createButtonTextActive: {
    color: "#FFF",
  },
});
