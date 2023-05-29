import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";

import { InfoScreen } from "../info/InfoScreen";
import { CommentsScreen } from "../info/CommentsScreen";
import { MapScreen } from "../info/MapScreen";
import { Logout } from "../../components/Lofout";

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

          headerRight: () => <Logout styles={{ marginRight: 16 }} />,
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
