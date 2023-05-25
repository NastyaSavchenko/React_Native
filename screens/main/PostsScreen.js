import React from "react";
import { TouchableOpacity } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { InfoScreen } from "../info/InfoScreen";
import { CommentsScreen } from "../info/CommentsScreen";
import { MapScreen } from "../info/MapScreen";

const PostScreen = createStackNavigator();

export const PostsScreen = () => {
  return (
    <PostScreen.Navigator>
      <PostScreen.Screen
        name="Публікації"
        component={InfoScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="appstore-o"
              size={24}
              color={focused ? "#ffffff" : "#BDBDBD"}
            />
          ),

          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              activeOpacity={0.8}
            >
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
      />

      <PostScreen.Screen
        name="Коментарі"
        component={CommentsScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            lineHeight: 22,
            color: "#212121",
            fontFamily: "RobotoMedium",
          },
        }}
      />
      <PostScreen.Screen
        name="Локація"
        component={MapScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            lineHeight: 22,
            color: "#212121",
            fontFamily: "RobotoMedium",
          },
        }}
      />
    </PostScreen.Navigator>
  );
};
