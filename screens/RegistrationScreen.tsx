import { useState } from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { colors } from "../styles/global";

import Input from "../components/Input";
import Button from "../components/Button";
import AddIcon from "../assets/images/svg/AddIcon";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const handleLoginChange = (value: string) => {
    setLogin(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const showPassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onRegister = () => {
    Alert.alert(
      "Credentials",
      `login: ${login}, email: ${email}, password: ${password}`
    );
  };

  const onLogin = () => {
    console.log("Login");
  };

  const showButton = (
    <TouchableOpacity onPress={showPassword}>
      <Text style={[styles.baseText, styles.passwordButtonText]}>
        {isPasswordVisible ? "Показати" : "Приховати"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <ImageBackground
          source={require("../assets/images/bg.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.formContainer}>
            <View style={styles.avatarContainer}>
              <AddIcon width="25" height="25" style={styles.plusIcon}></AddIcon>
            </View>
            <Text style={styles.title}>Реєстрація</Text>

            <View style={[styles.innerContainer, styles.inputContainer]}>
              <Input
                value={login}
                autofocus={true}
                placeholder="Логін"
                onTextChange={handleLoginChange}
              />

              <Input
                value={email}
                autofocus={true}
                placeholder="Адреса електронної пошти"
                onTextChange={handleEmailChange}
              />

              <Input
                value={password}
                placeholder="Пароль"
                rightButton={showButton}
                outerStyles={styles.passwordButton}
                onTextChange={handlePasswordChange}
                secureTextEntry={isPasswordVisible}
              />
            </View>

            <View style={[styles.innerContainer, styles.buttonContainer]}>
              <Button onPress={onRegister}>
                <Text style={[styles.baseText, styles.buttonText]}>
                  Зареєстуватися
                </Text>
              </Button>

              <View style={styles.loginContainer}>
                <Text style={[styles.baseText, styles.passwordButtonText]}>
                  Вже є акаунт?&ensp;
                  <TouchableWithoutFeedback onPress={onLogin}>
                    <Text style={styles.loginText}>Увійти</Text>
                  </TouchableWithoutFeedback>
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  innerContainer: {
    gap: 16,
  },
  inputContainer: {
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 42,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formContainer: {
    width: SCREEN_WIDTH,
    height: "60%",
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
  },
  avatarContainer: {
    position: "relative",
    marginTop: -152,
    marginBottom: 32,
    alignSelf: "center",
    width: 120,
    height: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,
  },
  plusIcon: {
    position: "absolute",
    bottom: 14,
    right: -12,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
  },
  passwordButtonText: {
    color: colors.blue,
  },
  passwordButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    textDecorationLine: "underline",
  },
});
