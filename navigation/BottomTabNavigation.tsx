import "react-native-gesture-handler";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";

import PostsScreen from "../screens/PostsScreen";

import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { colors } from "../styles/global";
import { styles } from "../styles/css";
import ProfileScreen from "../screens/ProfileScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import { StackParamList } from "./StackNavigator";

const Tab = createBottomTabNavigator<StackParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={() => ({
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerStyle: styles.tabHeader,
        headerTitleStyle: styles.tabHeaderTitle,
        headerTitleAlign: "center",
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabIcon,
        tabBarActiveBackgroundColor: colors.orange,
      })}
      backBehavior="history"
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={({ navigation }) => ({
          title: "Публікації",
          headerRight: () => (
            <TouchableOpacity style={styles.logoutBtn}>
              <Feather
                name="log-out"
                size={24}
                color={colors.underline_gray}
                onPress={() => navigation.navigate("Login")}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused }) => (
            <Feather
              name="grid"
              size={24}
              color={focused ? colors.white : colors.underline_gray}
            />
          ),
        })}
      />

      <Tab.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: "Створити публікацію",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={colors.black80} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="plus"
              size={24}
              color={focused ? colors.white : colors.underline_gray}
            />
          ),
          tabBarStyle: { display: "none" },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "",
          headerRight: () => (
            <TouchableOpacity style={styles.logoutBtn}>
              <Feather
                name="log-out"
                size={24}
                color={colors.underline_gray}
                onPress={() => navigation.navigate("Login")}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused }) => (
            <Feather
              name="user"
              size={24}
              color={focused ? colors.white : colors.underline_gray}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
