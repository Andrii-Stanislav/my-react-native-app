import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

import BottomTabNavigator from "./BottomTabNavigation";

export type StackParamList = {
  Home: undefined;
  Login: undefined;
  Registration: { userEmail: string };
};

const Stack = createStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
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

      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
