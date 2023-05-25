import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

const posts = [
  {
    postId: Math.random(),
    img: require("../../assets/img/plug_1.jpg"),
    name: "Ліс",
    comments: 0,
    location: "Ivano-Frankivsk Region Ukraine",
  },
  {
    postId: Math.random(),
    img: require("../../assets/img/plug_2.jpg"),
    name: "Захід на Чорному морі",
    comments: 0,
    location: "Ukraine",
  },
];

export const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          style={styles.photo}
          source={require("../../assets/img/ava.webp")}
        />
        <View>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.mail}>email@example.com</Text>
        </View>
      </View>
      <ScrollView style={{ width: "100%", paddingLeft: 16, paddingRight: 16 }}>
        {posts.map(({ postId, img, name, comments, location }) => {
          return (
            <View style={styles.postBox} key={postId}>
              <Image style={{ borderRadius: 8, width: "100%" }} source={img} />
              <Text style={styles.postTitle}>{name}</Text>
              <View style={styles.postInfo}>
                <View style={styles.wrapp}>
                  <TouchableOpacity>
                    <EvilIcons name="comment" size={24} color="#BDBDBD" style={styles.commentIcon}/>
                  </TouchableOpacity>
                  <Text style={{ marginLeft: 9 }}>{comments}</Text>
                </View>
                <View style={styles.wrapp}>
                  <Ionicons name="location-outline" size={18} color="#BDBDBD" />
                  <Text style={{ marginLeft: 4 }}>{location}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
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
    height: 300,
    width: "100%",
    borderRadius: 8,
    marginTop: 32,
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
