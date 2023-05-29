import * as ImagePicker from "expo-image-picker";

export const addAvatar = async (setValue) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setValue(result.assets[0].uri);
  }
};
