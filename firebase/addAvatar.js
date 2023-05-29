import { storage } from "./config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const uploadAvatar = async (image, folder) => {
 
  const response = await fetch(image);
  const file = await response.blob();
  const imageId = Math.random();
  const imagesRef = ref(storage, `${folder}/${imageId}`);

  await uploadBytesResumable(imagesRef, file);
  const url = await getDownloadURL(imagesRef);

  return url;
};