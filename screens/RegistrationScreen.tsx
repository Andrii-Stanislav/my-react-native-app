import { FC, useState } from "react";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { useDispatch } from "react-redux";

import { Image, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View } from "react-native";

import { StackParamList } from "../types";
import { styles } from "../styles/css";
import Input from "../components/Input";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";

import AddIcon from "../icons/AddIcon";

import { signUp } from "../redux/user/userOperations";
import { AppDispatch } from "../redux/store";

type HomeScreenProps = NativeStackScreenProps<StackParamList, "Registration">;

const RegistrationScreen: FC<HomeScreenProps> = ({ navigation, route }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const keyboardHide = () => {
    setKeyboardStatus(false);
    Keyboard.dismiss();
  };

  const handleInputFocus = (value: boolean) => {
    setKeyboardStatus(value);
  };

  const handleLoginChange = (value: string) => {
    setDisplayName(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const onRegister = () => {
    dispatch(signUp({ displayName, email, password }));
    navigation.navigate("Login");
  };

  const onLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.containerForKeyboard}>
        <Image source={require("../assets/images/bg.png")} resizeMode="cover" style={styles.image} />
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"}>
          <View
            style={{
              ...styles.formContainer,
              height: keyboardStatus ? "78%" : "60%",
            }}
          >
            <View style={styles.avatarContainer}>
              <AddIcon width="25" height="25" style={styles.plusIcon}></AddIcon>
            </View>
            <Text style={styles.title}>Реєстрація</Text>

            <View style={[styles.innerContainer, styles.inputContainer]}>
              <Input
                value={displayName}
                placeholder="Логін"
                onTextChange={handleLoginChange}
                onFocusStatus={handleInputFocus}
              />

              <Input
                value={email}
                placeholder="Адреса електронної пошти"
                onTextChange={handleEmailChange}
                onFocusStatus={handleInputFocus}
              />

              <PasswordInput
                value={password}
                placeholder="Пароль"
                onTextChange={handlePasswordChange}
                onFocusStatus={handleInputFocus}
              />
            </View>

            <View style={[styles.innerContainer, styles.buttonContainer]}>
              <Button onPress={onRegister}>
                <Text style={[styles.baseText, styles.buttonText]}>Зареєстуватися</Text>
              </Button>

              <View style={styles.loginContainer}>
                <Text style={[styles.baseText, styles.passwordButtonText]}>
                  Вже є акаунт?&ensp;
                  <TouchableWithoutFeedback onPress={onLogin}>
                    <Text style={styles.linkText}>Увійти</Text>
                  </TouchableWithoutFeedback>
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
