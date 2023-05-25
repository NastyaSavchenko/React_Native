import React from "react";
import { TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { PostsScreen } from "./main/PostsScreen";
import { CreatePostsScreen } from "./main/CreatePostsScreen";
import { ProfileScreen } from "./main/ProfileScreen";

const MainTabs = createBottomTabNavigator();

export const Home = ({ navigation }) => {
  return (
    <MainTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          paddingTop: 9,
          paddingRight: 70,
          paddingLeft: 70,
        },
        tabBarItemStyle: {
          width: 70,
          height: 40,
          borderRadius: 20,
        },
        tabBarActiveBackgroundColor: "#FF6C00",
      }}
      backBehavior="history"
    >
      <MainTabs.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="appstore-o"
              size={24}
              color={focused ? "#ffffff" : "#BDBDBD"}
            />
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }} activeOpacity={0.8}>
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "RobotoMedium",
            fontSize: 17,
            lineHeight: 22,
            color: "#212121",
          },
        }}
        name="Публікації"
        component={PostsScreen}
      />
      <MainTabs.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="plus"
              size={focused ? 18 : 24}
              color={focused ? "#ffffff" : "#BDBDBD"}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 20 }}>
              <Ionicons name="arrow-back" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "RobotoMedium",
            fontSize: 17,
            lineHeight: 22,
            color: "#212121",
          },
        }}
        name="Створити публікацію"
        component={CreatePostsScreen}
      />
      <MainTabs.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="user"
              size={24}
              color={focused ? "#ffffff" : "#BDBDBD"}
            />
          ),
          headerShown: false,
        }}
        name="Профіль"
        component={ProfileScreen}
      />
    </MainTabs.Navigator>
  );
};

