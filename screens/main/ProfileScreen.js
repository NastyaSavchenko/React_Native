import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  collection,
  getCountFromServer,
  onSnapshot,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { selectUser } from "../../redux/auth/authSelectors";
import {authAvatarChange} from '../../redux/auth/authOperations'
import { db } from "../../firebase/config";
import { addAvatar } from "../../firebase/avatar";

import { Background } from "../../components/Background";
import { Logout } from "../../components/Lofout";

export const ProfileScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState(null);
  const [photo, setPhoto] = useState(null);

  const dispatch = useDispatch();
  const { id, avatar, nickname } = useSelector(selectUser);
  console.log(avatar)

  const addLike = async ({ postId, likes }) => {
    try {
      await updateDoc(doc(db, "posts", postId), {
        likes: likes + 1,
      });
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const getPosts = async () => {
    const postsRef = collection(db, "posts");

    const q = query(postsRef, where("id", "==", id));

    onSnapshot(q, async (querySnapshot) => {
      const posts = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const coll = collection(db, `posts/${doc.id}/comments`);
          const snapshot = await getCountFromServer(coll);

          return {
            ...doc.data(),
            postId: doc.id,
            commentCount: snapshot.data().count,
          };
        })
      );

      setPosts(posts);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const changePhoto = async () => {
    await addAvatar(setPhoto);

    dispatch(authAvatarChange(photo));
  };

  return (
    <View style={styles.container}>
      <Background>
        <View style={{ width: "100%", height: "100%" }}>
          <View style={styles.userInfo}>
            <View style={{ marginBottom: 40 }}>
              <View style={styles.imgContainer}>
                {avatar ? (
                  <Image style={styles.avatar} source={{ uri: avatar }} />
                ) : (
                  <Image
                    style={styles.avatar}
                    source={require("../../assets/img/ava.webp")}
                  />
                )}

                <TouchableOpacity style={styles.icon} onPress={changePhoto}>
                  <MaterialIcons name="close" size={20} color="#E8E8E8" />
                </TouchableOpacity>
              </View>
              <Logout styles={{ marginLeft: "auto", marginTop: -40 }} />
            </View>
            <Text style={styles.name}>{nickname}</Text>

            {posts && (
              <FlatList
              
                data={posts}
                keyExtractor={(item) => item.postId}
                renderItem={({ item }) => (
                  <View style={styles.postBox} key={id}>
                    <Image style={styles.photo} source={{ uri: item.photo }} />
                    <Text style={styles.title}>{item.title}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("Коментарі", {
                              postId: item.postId,
                              uri: item.photo,
                            })
                          }
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginRight: 24,
                          }}
                        >
                          <EvilIcons
                            name="comment"
                            size={24}
                            color="#FF6C00"
                            iconStyle={{ backgroundColor: "#FF6C00" }}
                            style={styles.commentIcon}
                          />
                          <Text style={styles.comments}>
                            {item.commentCount}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            addLike({ postId: item.postId, likes: item.likes })
                          }
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <AntDesign name="like2" size={18} color="#FF6C00" />
                          <Text style={styles.comments}>
                            {item.likes ? item.likes : 0}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("Локація", {
                              location: item.location,
                            })
                          }
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Ionicons
                            name="location-outline"
                            size={18}
                            color="#BDBDBD"
                          />
                          <Text style={styles.location}>{item.place}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              />
            )}
            </View>
          </View>

      </Background>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  userInfo: {
    overflow: "visible",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 147,
    height: "100%",
  },
  postBox: {
    marginBottom: 34,
  },
  imgContainer: {
    position: "relative",
    width: 120,
    height: 120,
    marginTop: -60,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 16,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#E8E8E8",
    position: "absolute",
    bottom: 16,
    right: -12,
  },
  name: {
    fontFamily: "RobotoMedium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    textAlign: "center",
    marginBottom: 32,
  },
  photo: {
    marginBottom: 8,
    width: "100%",
    height: 240,
    overflow: "hidden",
    objectFit: "cover",
    borderRadius: 8,
  },
  title: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 11,
    marginTop: 8,
  },
  location: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
  comments: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginLeft: 6,
  },
  commentIcon: {
    ...Platform.select({
      android: {
        marginBottom: 6,
      },
    }),
  },
});
