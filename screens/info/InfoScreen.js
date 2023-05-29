import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { db } from "../../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  getCountFromServer,
} from "firebase/firestore";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
} from "react-native";

import { selectUser } from "../../redux/auth/authSelectors";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

export const InfoScreen = ({ route, navigation }) => {
  const { id, email, nickname, avatar } = useSelector(selectUser);
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const q = query(collection(db, "posts"));

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
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        {avatar ? (
          <Image style={styles.photo} source={{ uri: avatar }} />
        ) : (
          <Image
            style={styles.photo}
            source={require("../../assets/img/ava.webp")}
          />
        )}

        <View>
          <Text style={styles.name}>{nickname}</Text>
          <Text style={styles.mail}>{email}</Text>
        </View>
      </View>

      {posts && (
        <FlatList
          data={posts}
          style={{ width: "100%", paddingLeft: 16, paddingRight: 16 }}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View style={styles.postBox} key={id}>
              <Image style={styles.postImg} source={{ uri: item.photo }} />
              <Text style={styles.postTitle}>{item.title}</Text>
              <View style={styles.postInfo}>
                <View style={styles.wrapp}>
                  <TouchableOpacity>
                    <EvilIcons
                      name="comment"
                      size={24}
                      color="#BDBDBD"
                      style={styles.commentIcon}
                      onPress={() =>
                        navigation.navigate("Коментарі",  {
                          postId: item.postId,
                          uri: item.photo,
                        })
                      }
                    />
                  </TouchableOpacity>
                  <Text style={{ marginLeft: 9 }}>{item.commentCount}</Text>
                </View>
                <View style={styles.wrapp}>
                  <Ionicons
                    name="location-outline"
                    size={18}
                    color="#BDBDBD"
                    onPress={() =>
                      navigation.navigate("Локація", {
                        location: item.location,
                      })
                    }
                  />
                  <Text style={{ marginLeft: 4 }}>{item.place}</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  userInfo: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    paddingLeft: 16,
    marginTop: 32,
    marginBottom: 32,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  name: {
    marginLeft: 8,
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  mail: {
    marginLeft: 8,
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    borderRadius: 8,
    marginBottom: 32,
  },
  postImg: {
    marginBottom: 8,
    width: "100%",
    height: 240,
    overflow: "hidden",
    objectFit: "cover",
    borderRadius: 8,
  },
  postTitle: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginTop: 8,
  },
  postInfo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 11,
  },
  wrapp: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  commentIcon: {
    ...Platform.select({
      android: {
        marginBottom: 6,
      },
    }),
  },
});
