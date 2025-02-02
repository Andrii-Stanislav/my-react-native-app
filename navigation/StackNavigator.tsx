import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import CommentsScreen from "../screens/CommentsScreen";
import MapScreen from "../screens/MapScreen";

import { colors } from "../styles/global";
import { styles } from "../styles/css";
import { selectIsAuth } from "../redux/user/userSelectors";
import { StackParamList } from "../types";

import BottomTabNavigator from "./BottomTabNavigation";

const Stack = createStackNavigator<StackParamList>();

const StackNavigator = () => {
  const isLoggedIn = useSelector(selectIsAuth);

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? "Home" : "Login"}
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLoggedIn ? (
        <Fragment>
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="Comments"
            component={CommentsScreen}
            options={({ navigation }) => ({
              headerShown: true,
              title: "Коментарі",
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Feather name="arrow-left" size={24} color={colors.black80} />
                </TouchableOpacity>
              ),
              headerRightContainerStyle: { paddingRight: 16 },
              headerLeftContainerStyle: { paddingLeft: 16 },
              headerStyle: styles.tabHeader,
              headerTitleStyle: styles.tabHeaderTitle,
              headerTitleAlign: "center",
            })}
          />

          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={({ navigation }) => ({
              headerShown: true,

              title: "Локація",
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Feather name="arrow-left" size={24} color={colors.black80} />
                </TouchableOpacity>
              ),
              headerRightContainerStyle: { paddingRight: 16 },
              headerLeftContainerStyle: { paddingLeft: 16 },
              headerStyle: styles.tabHeader,
              headerTitleStyle: styles.tabHeaderTitle,
              headerTitleAlign: "center",
            })}
          />
        </Fragment>
      ) : (
        <Fragment>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{
              title: "",
              headerShown: false,
            }}
          />
        </Fragment>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
