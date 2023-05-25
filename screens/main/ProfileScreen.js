import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons'; 

import { Background } from "../../components/Background";

const posts = [
  {
    postId: Math.random(),
    img: require("../../assets/img/plug_1.jpg"),
    name: "Ліс",
    comments: 8,
    likes: 153,
    location: "Ivano-Frankivsk Region Ukraine",
  },
  {
    postId: Math.random(),
    img: require("../../assets/img/plug_2.jpg"),
    name: "Захід на Чорному морі",
    comments: 30,
    likes: 200,
    location: "Ukraine",
  },
  {
    postId: Math.random(),
    img: require("../../assets/img/plug_3.jpg"),
    name: "Старий будиночок у Венеції",
    comments: 50,
    likes: 200,
    location: "Italy",
  },
];

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Background>
        <ScrollView style={{ width: "100%" }}>
          <View style={styles.userInfo}>
            <View style={{ marginBottom: 40 }}>
              <View style={styles.imgContainer}>
                <Image
                  style={styles.avatar}
                  source={require("../../assets/img/ava.webp")}
                />
                <TouchableOpacity style={styles.icon}>
                  <MaterialIcons name="close" size={20} color="#E8E8E8" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{ marginLeft: "auto", marginTop: -40 }}>
                <MaterialIcons name="logout" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>Natali Romanova</Text>

            {posts.map(({ postId, img, name, comments, location, likes }) => {
              return (
                <View style={{ marginBottom: 34 }} key={postId}>
                  <Image style={styles.photo} source={img} />
                  <Text style={styles.title}>{name}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View  style={{ flexDirection: "row", alignItems: "center"}}>
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center", marginRight: 24 }}
                    >
                      <EvilIcons
                        name="comment"
                        size={24}
                        color="#FF6C00"
                        iconStyle={{backgroundColor: "#FF6C00" }}
                        style={styles.commentIcon}
                      />
                      <Text style={styles.comments}>{comments}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center"}}
                    >
                      <AntDesign name="like2" size={18}  color="#FF6C00" />
                      <Text style={styles.comments}>{likes}</Text>
                    </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Ionicons
                          name="location-outline"
                          size={18}
                          color="#BDBDBD"
                        />
                        <Text style={styles.location}>{location}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </Background>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    paddingTop: 300,
  },
  userInfo: {
    overflow: "visible",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 147,
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
    height: 240,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    objectFit: "cover",
    marginBottom: 8,
  },
  title: {
    fontFamily: "RobotoMedium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 11,
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
