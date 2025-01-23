import { FC, useState } from "react";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { StackParamList } from "../navigation/StackNavigator";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { styles } from "../styles/css";

import Input from "../components/Input";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";

type HomeScreenProps = NativeStackScreenProps<StackParamList, "Login">;

const LoginScreen: FC<HomeScreenProps> = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setKeyboardStatus(true);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const onLogin = () => {
    navigation.navigate("Home");
  };

  const onRegister = () => {
    navigation.navigate("Registration", { userEmail: email });
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.formContainerLogin,
              height: keyboardStatus ? "50%" : "55%",
            }}
          >
            <Text style={styles.title}>Увійти</Text>

            <View style={[styles.innerContainer, styles.inputContainer]}>
              <Input
                value={email}
                autofocus={true}
                placeholder="Адреса електронної пошти"
                onTextChange={handleEmailChange}
              />

              <PasswordInput
                value={password}
                placeholder="Пароль"
                onTextChange={handlePasswordChange}
              />
            </View>

            <View style={[styles.innerContainer, styles.buttonContainer]}>
              <Button onPress={onLogin}>
                <Text style={[styles.baseText, styles.buttonText]}>Увійти</Text>
              </Button>

              <View style={styles.loginContainer}>
                <Text style={[styles.baseText, styles.passwordButtonText]}>
                  Немає акаунту?&ensp;
                  <TouchableWithoutFeedback onPress={onRegister}>
                    <Text style={styles.linkText}>Зареєструватися</Text>
                  </TouchableWithoutFeedback>
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default LoginScreen;
