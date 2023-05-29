import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { db } from "../../firebase/config";
import { selectUser } from "./../../redux/auth/authSelectors";

export const CommentsScreen = ({ route }) => {
  const { postId, uri } = route.params;
  const { avatar, nickname } = useSelector(selectUser);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  const createComment = async () => {
    try {
      const timestamp = new Date();
      const formattedDateTime = format(timestamp, "dd MMMM, yyyy | HH:mm", {
        locale: uk,
      });

      const docRef = await addDoc(collection(db, `posts/${postId}/comments`), {
        comment,
        nickname,
        avatar,
        created: formattedDateTime,
      });
      Keyboard.dismiss();
      setComment("");
    } catch (error) {
      setError(error.message);
    }
  };

  const getComments = async () => {
    const q = query(collection(db, `posts/${postId}/comments`));
    onSnapshot(q, (querySnapshot) => {
      const comments = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        commentId: doc.id,
      }));
      setComments(comments);
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri }} />

        {comments.length > 0 && (
          <FlatList
            data={comments}
            keyExtractor={(item) => item.commentId}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection:
                    item.nickname === nickname ? "row-reverse" : "row",
                  marginBottom: 24,
                }}
              >
                <View style={styles.avatarWrapper(item.nickname === nickname)}>
                  {item.avatar ? (
                    <Image
                      style={styles.avatar}
                      source={{ uri: item.avatar }}
                    />
                  ) : (
                    <FontAwesome name="user-circle" size={28} />
                  )}
                </View>
                <View style={styles.userContainer}>
                  <Text style={styles.nickname(item.nickname === nickname)}>
                    {item.nickname}
                  </Text>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.comment}</Text>

                    <Text style={styles.data(item.nickname === nickname)}>
                      {item.created}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.select({
            ios: 100,
          })}
        >
          <View style={{ position: "relative", marginTop: "auto" }}>
            <TextInput
              style={styles.input}
              placeholder="Коментувати..."
              placeholderTextColor={"#BDBDBD"}
              value={comment}
              onChangeText={(text) => setComment(text)}
            />
            <TouchableOpacity style={styles.sendButton} onPress={createComment}>
              <Feather name="arrow-up" size={24} color="#FFF" />
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
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 32,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#BDBDBD",
  },
  photo: {
    width: "100%",
    height: 240,
    objectFit: "cover",
    borderRadius: 8,
    marginBottom: 32,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
    objectFit: "cover",
  },
  avatarWrapper: (props) => ({
    marginRight: props ? 0 : 16,
    marginLeft: props ? 16 : 0,
    width: 28,
    height: 28,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "#E8E8E8",
  }),
  textContainer: {
    flex: 1,
    padding: 16,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
  },
  userContainer: {
    flex: 1,
    width: "100%",
  },
  text: {
    marginBottom: 8,
    fontFamily: "RobotoRegular",
    fontSize: 13,
    color: "#212121",
  },
  data: (props) => ({
    fontFamily: "RobotoRegular",
    fontSize: 10,
    color: "#BDBDBD",
    textAlign: props ? "left" : "right",
  }),
  input: {
    padding: 16,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    fontFamily: "RobotoRegular",
    fontSize: 16,
    color: "#212121",
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 8,
    top: 8,
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
  nickname: (props) => ({
    marginBottom: 8,
    fontFamily: "RobotoMedium",
    fontSize: 13,
    color: "#212121",
    textAlign: props ? "right" : "left",
  }),
});
